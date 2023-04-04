import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ColorPicker, InputRadio, NumberInput, SubmitButton } from 'shared/components';
import { chakraColorToRGBA, DEFAULT_RGBA_COLOR, onPromise } from 'shared/lib';

import { EMethod } from '../model';
import { getMethod, getSymmetricPixels } from '../lib';
import { useCanvasStore } from '../store';

interface IFormCircle {
	x: number;
	y: number;
	radius: number;
	method: EMethod;
	color: string;
}

export const FormCircle: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IFormCircle>();

	const pushFigure = useCanvasStore((state) => state.pushFigure);
	const onAction: SubmitHandler<IFormCircle> = (data): void => {
		const rgba = chakraColorToRGBA(data.color) ?? DEFAULT_RGBA_COLOR;
		const drawFunction = getMethod(data.method);
		const pixels = drawFunction({ x: +data.x, y: +data.y }, +data.radius, rgba);
		const circle = getSymmetricPixels(pixels, { x: +data.x, y: +data.y });

		pushFigure(circle);
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
