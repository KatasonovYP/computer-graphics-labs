import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Stack } from '@chakra-ui/react';
import { ActionInput } from '@shared/components';
import { useFigureStore } from '@shared/lib/store';

interface IRotateForm {
	angle: number;
}

const RotateForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRotateForm>();

	const rotate = useFigureStore((state) => state.rotate);

	const onAction: SubmitHandler<IRotateForm> = (data) => {
		rotate(Number(data.angle));
	};

	return (
		<form onSubmit={handleSubmit(onAction)}>
			<Stack spacing={4}>
				<ActionInput {...{ register, errors, name: 'angle', defaultValue: 30 }} />

				<Button variant="solid" type="submit">
					Вращать
				</Button>
			</Stack>
		</form>
	);
};

export default RotateForm;
