import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ColorPicker, InputRadio, SubmitButton } from 'shared/components';
import { chakraColorToRGBA, onPromise } from 'shared/lib';

import { EFillFigureMethod } from '../model';
import { useFiguresStore } from '../store';
import { fillFigure } from '../lib/fill-figure';

interface IFormFillFigure {
	method: EFillFigureMethod;
	color: string;
}

export const FormFillFigure: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IFormFillFigure>();

	const figures = useFiguresStore((state) => state.figures);
	const pushPixels = useFiguresStore((state) => state.pushPixels);

	const onAction: SubmitHandler<IFormFillFigure> = (data): void => {
		console.log(data);
		const color = chakraColorToRGBA(data.color);
		if (!color) throw new Error('Invalid color');
		for (const figure of figures) {
			const pixels = fillFigure(figure, color);
			pushPixels(pixels);
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
					<ColorPicker {...{ setValue, register, errors, name: 'color' }} />
				</Stack>
				<InputRadio {...{ register, errors, name: 'method', choices: EFillFigureMethod }} />
				<SubmitButton>Draw</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
