import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ColorPicker, InputRadio, NumberInput, SubmitButton } from 'shared/components';
import { chakraColorToRGBA, DEFAULT_RGBA_COLOR, onPromise } from 'shared/lib';

import { EMethod, type IPosition } from '../model';
import { getMethodEllipse, getReflectedEllipsePixels } from '../lib';
import { useFiguresStore } from '../store';

interface IFormEllipse {
	x: number;
	y: number;
	radiusX: number;
	radiusY: number;
	method: EMethod;
	color: string;
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
		const radius: IPosition = { x: +data.radiusX, y: +data.radiusY };
		const center: IPosition = { x: +data.x, y: +data.y };
		const method = getMethodEllipse(data.method);
		const pixels = method(center, radius, rgba);
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
					<NumberInput {...{ register, errors, name: 'x', defaultValue: 10 }} />
					<NumberInput {...{ register, errors, name: 'y', defaultValue: 15 }} />
					<NumberInput {...{ register, errors, name: 'radiusX', defaultValue: 75 }} />
					<NumberInput {...{ register, errors, name: 'radiusY', defaultValue: 75 }} />
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
