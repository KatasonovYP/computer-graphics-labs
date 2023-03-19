import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, Stack } from '@chakra-ui/react';

import { NumberInput } from 'shared/components';
import { onPromise, useFigureStore } from 'shared/lib';

interface IMoveForm {
	x: number;
	y: number;
}

export const PivotForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMoveForm>();

	const setPivot = useFigureStore((state) => state.setPivot);

	const onAction: SubmitHandler<IMoveForm> = (data): void => {
		setPivot(Number(data.x), Number(data.y));
	};

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<Stack spacing={2}>
				<NumberInput {...{ register, errors, name: 'x', defaultValue: 150 }} />
				<NumberInput {...{ register, errors, name: 'y', defaultValue: 150 }} />

				<Button
					variant='solid'
					type='submit'
				>
					Поставить центр
				</Button>
			</Stack>
		</form>
	);
};