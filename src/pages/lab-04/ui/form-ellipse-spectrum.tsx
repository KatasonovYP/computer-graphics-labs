import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ColorPicker, InputRadio, NumberInput, SubmitButton } from 'shared/components';
import { chakraColorToRGBA, DEFAULT_RGBA_COLOR, onPromise } from 'shared/lib';

import { type IPosition } from 'shared/model';

import { EMethod } from '../model';
import { getMethodEllipse, getReflectedEllipsePixels } from '../lib';
import { useFiguresStore } from '../store';

interface IFormEllipseSpectrum {
	x: number;
	y: number;
	radiusX: number;
	radiusY: number;
	step: number;
	count: number;
	method: EMethod;
	color: string;
}

export const FormEllipseSpectrum: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IFormEllipseSpectrum>();

	const pushFigure = useFiguresStore((state) => state.pushFigure);
	const onAction: SubmitHandler<IFormEllipseSpectrum> = (data): void => {
		const center = { x: +data.x, y: +data.y };
		const radius: IPosition = { x: +data.radiusX, y: +data.radiusY };
		const rgba = chakraColorToRGBA(data.color) ?? DEFAULT_RGBA_COLOR;

		for (let index = 0; index < +data.count; ++index) {
			const drawFunction = getMethodEllipse(data.method);
			const pixels = drawFunction(center, radius, rgba);
			const circle = getReflectedEllipsePixels(pixels, center);

			pushFigure(circle);

			const constant = radius.x / radius.y;
			radius.x += +data.step;
			radius.y = Math.round(radius.x / constant);
			// radius.y += +data.step;
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
					<NumberInput {...{ register, errors, name: 'radiusX', defaultValue: 75 }} />
					<NumberInput {...{ register, errors, name: 'radiusY', defaultValue: 150 }} />
					<NumberInput {...{ register, errors, name: 'count', defaultValue: 5 }} />
					<NumberInput {...{ register, errors, name: 'step', defaultValue: 10 }} />
				</Stack>
				<Stack spacing={6}>
					<InputRadio {...{ register, errors, name: 'method', choices: EMethod }} />
					<ColorPicker {...{ setValue, register, errors, name: 'color' }} />
				</Stack>
				<SubmitButton>Draw</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
