import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Stack } from '@chakra-ui/react';

import { NumberInput, SubmitButton } from 'shared/components';
import { onPromise, useFigureStore } from 'shared/lib';

interface IMoveForm {
	kx: number;
	ky: number;
}

export const ScaleForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMoveForm>();

	const scale = useFigureStore((state) => state.scale);

	const onAction: SubmitHandler<IMoveForm> = (data): void => {
		scale(Number(data.kx), Number(data.ky));
	};

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<Stack spacing={4}>
				<NumberInput {...{ register, errors, name: 'kx', defaultValue: 1.2 }} />
				<NumberInput {...{ register, errors, name: 'ky', defaultValue: 1.2 }} />

				<SubmitButton>Масштабировать</SubmitButton>
			</Stack>
		</form>
	);
};
