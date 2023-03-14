import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Stack } from '@chakra-ui/react';
import { ActionInput } from '@shared/components';
import { useFigureStore } from '@shared/lib/store';

interface IMoveForm {
	dx: number;
	dy: number;
}

const MoveForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMoveForm>();

	const move = useFigureStore((state) => state.move);

	const onAction: SubmitHandler<IMoveForm> = (data) => {
		move(Number(data.dx), Number(data.dy));
	};

	return (
		<form onSubmit={handleSubmit(onAction)}>
			<Stack spacing={4}>
				<ActionInput {...{ register, errors, name: 'dx', defaultValue: 10 }} />
				<ActionInput {...{ register, errors, name: 'dy', defaultValue: 15 }} />

				<Button variant="solid" type="submit">
					Переместить
				</Button>
			</Stack>
		</form>
	);
};

export default MoveForm;
