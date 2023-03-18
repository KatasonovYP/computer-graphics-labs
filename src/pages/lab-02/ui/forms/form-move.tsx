import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Stack } from '@chakra-ui/react';

import { NumberInput, SubmitButton } from 'shared/components';
import { onPromise, useFigureStore } from 'shared/lib';

interface IMoveForm {
	dx: number;
	dy: number;
}

export const MoveForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMoveForm>();

	const move = useFigureStore((state) => state.move);

	const onAction: SubmitHandler<IMoveForm> = (data): void => {
		move(Number(data.dx), Number(data.dy));
	};

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<Stack spacing={4}>
				<NumberInput {...{ register, errors, name: 'dx', defaultValue: 10 }} />
				<NumberInput {...{ register, errors, name: 'dy', defaultValue: 15 }} />

				<SubmitButton>Переместить</SubmitButton>
			</Stack>
		</form>
	);
};
