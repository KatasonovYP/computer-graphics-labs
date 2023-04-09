import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ColorPicker, InputRadio, NumberInput, SubmitButton } from 'shared/components';
import { chakraColorToRGBA, DEFAULT_RGBA_COLOR, onPromise } from 'shared/lib';

import { type Irgba } from 'shared/model';

import { EMethod, type IPosition, Pixel } from '../model';
import { getReflectedEllipsePixels } from '../lib';
import { useFiguresStore } from '../store';

interface IFormEllipse {
	x: number;
	y: number;
	radiusX: number;
	radiusY: number;
	method: EMethod;
	color: string;
}

export function bresenhamEllipse(center: IPosition, radius: IPosition, color: Irgba): Pixel[] {
	const pixels: Pixel[] = [];
	let x = 0;
	let y = radius.y;

	const sqrRadiusX = radius.x ** 2;
	const sqrRadiusY = radius.y ** 2;
	let delta = sqrRadiusY - sqrRadiusX * (2 * radius.y + 1);

	while (y >= 0) {
		if (delta < 0) {
			const d1 = 2 * delta + sqrRadiusX * (2 * y + 2);

			++x;
			delta += sqrRadiusY * (2 * x + 1);

			if (d1 >= 0) {
				--y;
				delta += sqrRadiusX * (1 - 2 * y);
			}
		} else if (delta > 0) {
			const d2 = 2 * delta + sqrRadiusY * (2 - 2 * x);

			--y;
			delta += sqrRadiusX * (1 - 2 * y);

			if (d2 <= 0) {
				++x;
				delta += sqrRadiusY * (2 * x + 1);
			}
		} else {
			--y;
			++x;
			delta += sqrRadiusY * (2 * x + 1) + sqrRadiusX * (1 - 2 * y);
		}
		pixels.push(new Pixel(x + center.x, y + center.y, color));
	}
	return pixels;
}

export const FormEllipse: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IFormEllipse>();

	const pushFigure = useFiguresStore((state) => state.pushFigure);
	const onAction: SubmitHandler<IFormEllipse> = (data): void => {
		const rgba = chakraColorToRGBA(data.color) ?? DEFAULT_RGBA_COLOR;
		// const drawFunction = getMethod(data.method);
		const radius: IPosition = { x: +data.radiusX, y: +data.radiusY };
		const center: IPosition = { x: +data.x, y: +data.y };
		const pixels = bresenhamEllipse(center, radius, rgba);
		const circle = getReflectedEllipsePixels(pixels, center);

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
					<NumberInput {...{ register, errors, name: 'x', defaultValue: 50 }} />
					<NumberInput {...{ register, errors, name: 'y', defaultValue: 100 }} />
					<NumberInput {...{ register, errors, name: 'radiusX', defaultValue: 20 }} />
					<NumberInput {...{ register, errors, name: 'radiusY', defaultValue: 40 }} />
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
