import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ColorPicker, InputRadio, NumberInput, SubmitButton } from 'shared/components';
import { chakraColorToRGBA, DEFAULT_RGBA_COLOR, onPromise } from 'shared/lib';

import { EMethod } from '../model';
import { getMethod, getReflectedPixels } from '../lib';
import { useFiguresStore } from '../store';

interface IFormCircleSpectrum {
	x: number;
	y: number;
	radius: number;
	step: number;
	count: number;
	method: EMethod;
	color: string;
}

export const FormCircleSpectrum: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IFormCircleSpectrum>();

	const pushFigure = useFiguresStore((state) => state.pushFigure);
	const onAction: SubmitHandler<IFormCircleSpectrum> = (data): void => {
		let radius = +data.radius;
		const center = { x: +data.x, y: +data.y };

		for (let index = 0; index < +data.count; ++index) {
			const rgba = chakraColorToRGBA(data.color) ?? DEFAULT_RGBA_COLOR;
			const drawFunction = getMethod(data.method);
			const pixels = drawFunction(center, radius, rgba);
			const circle = getReflectedPixels(pixels, center);

			pushFigure(circle);

			radius += +data.step;
		}
	};

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<SimpleGrid
				m='auto'
				maxW={'fit-content'}
				columns={[1, null, 2]}
				spacing={4}
			>
				<Stack spacing={2}>
					<NumberInput {...{ register, errors, name: 'x', defaultValue: 10 }} />
					<NumberInput {...{ register, errors, name: 'y', defaultValue: 15 }} />
					<NumberInput {...{ register, errors, name: 'radius', defaultValue: 75 }} />
					<NumberInput {...{ register, errors, name: 'count', defaultValue: 5 }} />
					<NumberInput {...{ register, errors, name: 'step', defaultValue: 10 }} />
				</Stack>
				<Stack spacing={6}>
					<InputRadio {...{ register, errors, name: 'method', choices: EMethod }} />
					<ColorPicker {...{ setValue, register, errors, name: 'color' }} />
				</Stack>
				<SubmitButton>Отрисовать</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
