import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, SimpleGrid, Stack } from '@chakra-ui/react';

import { NumberInput, SubmitButton } from 'shared/components';
import { onPromise } from 'shared/lib';

import { useLinesStore } from '../store/lines-store';

interface IRotateLineForm {
	angle: number;
}

export const RotateLineForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRotateLineForm>();

	const currentLine = useLinesStore((state) => state.target);
	const spectrum = useLinesStore((state) => state.spectrum);

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const onAction: SubmitHandler<IRotateLineForm> = (data): void => {
		if (currentLine) {
			spectrum(+data.angle);
			// currentLine.rotate(+data.angle);
			// pushLine(currentLine);
			// setChoosing(false);
		}
	};

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<SimpleGrid
				m='auto'
				maxW={'fit-content'}
				columns={[1, null, 2]}
				spacing={4}
			>
				<Stack spacing={2}>
					<NumberInput {...{ register, errors, name: 'angle', defaultValue: 30 }} />
				</Stack>
				<SubmitButton>Повернуть</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
