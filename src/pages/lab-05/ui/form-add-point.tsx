import { type FC, useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, SimpleGrid } from '@chakra-ui/react';

import { NumberInput, SubmitButton } from 'shared/components';
import { onPromise } from 'shared/lib';

import { useFiguresStore } from '../store';

interface IFormAddPoint {
	x: number;
	y: number;
}

export const FormAddPoint: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormAddPoint>();

	const addPoint = useFiguresStore((state) => state.addPoint);
	const closeFigure = useFiguresStore((state) => state.closeFigure);
	const points = useFiguresStore((state) => state.points);
	const figures = useFiguresStore((state) => state.figures);

	const onAction: SubmitHandler<IFormAddPoint> = (data): void => {
		addPoint({ x: +data.x, y: +data.y });
	};

	useEffect(() => {
		console.log('points', points);
		console.log('figures', figures);
	}, [points, figures]);

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<SimpleGrid
				m='auto'
				maxW={'container.sm'}
				columns={[1, null, 2]}
				spacing={4}
			>
				<NumberInput {...{ register, errors, name: 'x', defaultValue: 10 }} />
				<NumberInput {...{ register, errors, name: 'y', defaultValue: 15 }} />
				<SubmitButton>Add Point</SubmitButton>
				<Button onClick={closeFigure}>Close Figure</Button>
			</SimpleGrid>
		</form>
	);
};
