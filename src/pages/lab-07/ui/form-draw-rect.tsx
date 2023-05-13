import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { ColorPicker, NumberInput, SubmitButton } from 'shared/components';
import { chakraColorToHex, onPromise } from 'shared/lib';

import { useShapesStore } from '../store';

interface IDrawRectForm {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
}

export const FormDrawRect: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IDrawRectForm>();

	const setRectangle = useShapesStore((state) => state.setRectangle);

	const onAction: SubmitHandler<IDrawRectForm> = (data): void => {
		setRectangle({
			x: +data.x,
			y: +data.y,
			width: +data.width,
			height: +data.height,
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
					<NumberInput {...{ register, errors, name: 'x', defaultValue: 10 }} />
					<NumberInput {...{ register, errors, name: 'y', defaultValue: 15 }} />
				</Stack>
				<Stack spacing={2}>
					<NumberInput {...{ register, errors, name: 'width', defaultValue: 75 }} />
					<NumberInput {...{ register, errors, name: 'height', defaultValue: 200 }} />
				</Stack>
				<Stack
					spacing={2}
					direction='row'
					align='center'
				>
					<ColorPicker {...{ setValue, register, errors, name: 'color' }} />
				</Stack>
				<SubmitButton>Draw</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
