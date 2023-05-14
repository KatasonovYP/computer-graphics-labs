import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, SimpleGrid } from '@chakra-ui/react';

import { NumberInput, SubmitButton } from 'shared/components';
import { onPromise } from 'shared/lib';

import { useShapesStore } from '../store';
import { useCloseShape } from '../hooks/use-close-shape';

interface IDrawRectForm {
	x: number;
	y: number;
}

export const FormDrawShape: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IDrawRectForm>();

	const addPointToShape = useShapesStore((state) => state.addPointToShape);
	const { closeShapeHandler } = useCloseShape();
	const onAction: SubmitHandler<IDrawRectForm> = (data): void => {
		addPointToShape([Math.round(+data.x), Math.round(+data.y)]);
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
				<Button onClick={closeShapeHandler}>Close shape</Button>
				<SubmitButton>Add Point</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
