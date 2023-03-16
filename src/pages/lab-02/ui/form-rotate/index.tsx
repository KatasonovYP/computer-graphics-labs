import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, Stack } from '@chakra-ui/react';

import { ActionInput } from 'shared/components';
import { onPromise, useFigureStore } from 'shared/lib';

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

	const onAction: SubmitHandler<IRotateForm> = (data): void => {
		rotate(Number(data.angle));
	};

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<Stack spacing={4}>
				<ActionInput {...{ register, errors, name: 'angle', defaultValue: 30 }} />

				<Button
					variant='solid'
					type='submit'
				>
					Вращать
				</Button>
			</Stack>
		</form>
	);
};

export default RotateForm;
