import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, SimpleGrid } from '@chakra-ui/react';

import { NumberInput, SubmitButton } from 'shared/components';
import { onPromise } from 'shared/lib';

import { useShapesStore } from '../store';
import { useClosePolygon } from '../hooks/use-close-polygon';

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
	const { closePolygonHandler } = useClosePolygon();
	const onAction: SubmitHandler<IDrawRectForm> = (data): void => {
		addPointToPolygon([Math.round(+data.x), Math.round(+data.y)]);
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
				<Button onClick={closePolygonHandler}>Close polygon</Button>
				<SubmitButton>Add Point</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
