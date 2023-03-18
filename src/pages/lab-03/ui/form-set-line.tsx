import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ActionInput, SubmitButton } from 'shared/components';
import { onPromise } from 'shared/lib';

import { useLinesStore } from '../store/lines-store';
import { type IPoint, Point } from '../model';
import { dda } from '../lib/logic/dda';

interface ISetLinesForm {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export const SetLineForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISetLinesForm>();

	const pushLine = useLinesStore((state) => state.push);

	const onAction: SubmitHandler<ISetLinesForm> = (data): void => {
		const a: IPoint = Object.create(Point).init(+data.x1, +data.y1);
		const b: IPoint = Object.create(Point).init(+data.x2, +data.y2);

		const [pixels, steps] = dda(a, b);
		pushLine({ pixels, color: '#f00' });
		console.log(steps);
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
					<ActionInput {...{ register, errors, name: 'x1', defaultValue: 10 }} />
					<ActionInput {...{ register, errors, name: 'y1', defaultValue: 15 }} />
				</Stack>
				<Stack spacing={2}>
					<ActionInput {...{ register, errors, name: 'x2', defaultValue: 75 }} />
					<ActionInput {...{ register, errors, name: 'y2', defaultValue: 200 }} />
				</Stack>
				<SubmitButton>Отрисовать</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
