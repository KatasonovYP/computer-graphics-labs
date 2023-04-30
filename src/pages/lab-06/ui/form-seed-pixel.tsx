import { type FC, useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, SimpleGrid } from '@chakra-ui/react';

import { NumberInput, SubmitButton } from 'shared/components';
import { onPromise } from 'shared/lib';

import { useFiguresStore } from '../store';

interface IFormSeedPixel {
	x: number;
	y: number;
}

export const FormSeedPixel: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormSeedPixel>();

	const setSeedPixel = useFiguresStore((state) => state.setSeedPixel);
	const seedPixel = useFiguresStore((state) => state.seedPixel);
	const onAction: SubmitHandler<IFormSeedPixel> = (data): void => {
		setSeedPixel({ x: +data.x, y: +data.y });
	};

	useEffect(() => {
		console.log('points', seedPixel);
	}, [seedPixel]);

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<SimpleGrid
				m='auto'
				maxW={'container.sm'}
				columns={[1, null, 2, 3]}
				spacing={4}
			>
				<NumberInput {...{ register, errors, name: 'x', defaultValue: 200 }} />
				<NumberInput {...{ register, errors, name: 'y', defaultValue: 100 }} />
				<SubmitButton>Seed pixel</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
