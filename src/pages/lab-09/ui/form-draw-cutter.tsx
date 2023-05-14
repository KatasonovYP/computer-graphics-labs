import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, SimpleGrid } from '@chakra-ui/react';

import { NumberInput, SubmitButton } from 'shared/components';
import { onPromise } from 'shared/lib';

import { useShapesStore } from '../store';
import { useCloseCutter } from '../hooks/use-close-cutter';

interface IDrawRectForm {
	x: number;
	y: number;
}

export const FormDrawCutter: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IDrawRectForm>();

	const addPointToCutter = useShapesStore((state) => state.addPointToCutter);
	const { closeCutterHandler } = useCloseCutter();
	const onAction: SubmitHandler<IDrawRectForm> = (data): void => {
		addPointToCutter([Math.round(+data.x), Math.round(+data.y)]);
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
				<Button onClick={closeCutterHandler}>Close cutter</Button>
				<SubmitButton>Add Point</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
