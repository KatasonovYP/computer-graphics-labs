import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ColorPicker, InputRadio, NumberInput, SubmitButton } from 'shared/components';
import { chakraColorToRGBA, DEFAULT_RGBA_COLOR, onPromise } from 'shared/lib';

import { EMethod } from '../model';
import { useFiguresStore } from '../store';

interface IFormFillFigure {
	x: number;
	y: number;
	radius: number;
	step: number;
	count: number;
	method: EMethod;
	color: string;
}

export const FormFillFigure: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IFormFillFigure>();

	const onAction: SubmitHandler<IFormFillFigure> = (data): void => {
		console.log(data);
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
				<InputRadio {...{ register, errors, name: 'method', choices: EMethod }} />
				<SubmitButton>Draw</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
