import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Stack } from '@chakra-ui/react';

import { NumberInput, SubmitButton } from 'shared/components';
import { onPromise, useFigureStore } from 'shared/lib';

interface IRotateForm {
	angle: number;
}

export const RotateForm: FC = () => {
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
				<NumberInput {...{ register, errors, name: 'angle', defaultValue: 30 }} />

				<SubmitButton>Вращать</SubmitButton>
			</Stack>
		</form>
	);
};
