import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, SimpleGrid, Stack } from '@chakra-ui/react';

import { NumberInput, SubmitButton } from 'shared/components';
import { onPromise } from 'shared/lib';

import { useShapesStore } from '../store';

interface IDrawRectForm {
	x: number;
	y: number;
}

export const FormDrawPolygon: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IDrawRectForm>();

	const addPointToPolygon = useShapesStore((state) => state.addPointToPolygon);
	const closePolygon = useShapesStore((state) => state.closePolygon);

	const onAction: SubmitHandler<IDrawRectForm> = (data): void => {
		addPointToPolygon([+data.x, +data.y]);
	};

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<SimpleGrid
				m='auto'
				maxW={'fit-content'}
				columns={[1, null, 2]}
				spacing={4}
			>
				<NumberInput {...{ register, errors, name: 'x', defaultValue: 10 }} />
				<NumberInput {...{ register, errors, name: 'y', defaultValue: 15 }} />
				<Button onClick={closePolygon}>Close polygon</Button>
				<SubmitButton>Add Point</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
