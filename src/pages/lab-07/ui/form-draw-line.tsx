import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ColorPicker, NumberInput, SubmitButton } from 'shared/components';
import { chakraColorToHex, onPromise } from 'shared/lib';

import { useShapesStore } from '../store';
import { ILine } from '../model';

interface ISetLinesForm {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	color: string;
}

export const FormDrawLine: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<ISetLinesForm>();

	const addLine = useShapesStore((state) => state.addLine);

	const onAction: SubmitHandler<ISetLinesForm> = (data): void => {
		addLine({
			points: [+data.x1, +data.y1, +data.x2, +data.y2],
			color: chakraColorToHex(data.color),
		});
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
					<NumberInput {...{ register, errors, name: 'x1', defaultValue: 10 }} />
					<NumberInput {...{ register, errors, name: 'y1', defaultValue: 15 }} />
				</Stack>
				<Stack spacing={2}>
					<NumberInput {...{ register, errors, name: 'x2', defaultValue: 75 }} />
					<NumberInput {...{ register, errors, name: 'y2', defaultValue: 200 }} />
				</Stack>
				<Stack
					spacing={2}
					direction='row'
					align='center'
				>
					<ColorPicker {...{ setValue, register, errors, name: 'color' }} />
				</Stack>
				<SubmitButton>Отрисовать</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
