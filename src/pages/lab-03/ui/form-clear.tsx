import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, SimpleGrid, Stack } from '@chakra-ui/react';

import { NumberInput, SubmitButton } from 'shared/components';
import { onPromise } from 'shared/lib';

import { useLinesStore } from '../store/lines-store';

interface IRotateLineForm {
	angle: number;
}

export const FormClear: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRotateLineForm>();

	const clear = useLinesStore((state) => state.clear);
	// eslint-disable-next-line unicorn/consistent-function-scoping
	const onAction: SubmitHandler<IRotateLineForm> = (data): void => {
		clear();
	};

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<SimpleGrid
				m='auto'
				maxW={'fit-content'}
				columns={[1, null, 2]}
				spacing={4}
			>
				<SubmitButton>Очистить</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
