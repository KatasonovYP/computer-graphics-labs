import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ColorPicker, InputRadio, NumberInput, SubmitButton } from 'shared/components';
import { onPromise } from 'shared/lib';

import { useLinesStore } from '../store/lines-store';
import { EMethod, type IPoint, Point } from '../model';
import { getMethod } from '../lib/logic';

interface ISetLinesForm {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	method: EMethod;
	color: string;
}

export const SetLineForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISetLinesForm>();

	const pushLine = useLinesStore((state) => state.push);

	const onAction: SubmitHandler<ISetLinesForm> = (data): void => {
		const a: IPoint = Point.new(+data.x1, +data.y1);
		const b: IPoint = Point.new(+data.x2, +data.y2);

		const method = getMethod(data.method);

		const [pixels, steps] = method(a, b);
		pushLine({ pixels, color: '#f00' });

		console.log(steps);
		console.log(data.color);
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
					<NumberInput {...{ register, errors, name: 'x1', defaultValue: 10 }} />
					<NumberInput {...{ register, errors, name: 'y1', defaultValue: 15 }} />
				</Stack>
				<Stack spacing={2}>
					<NumberInput {...{ register, errors, name: 'x2', defaultValue: 75 }} />
					<NumberInput {...{ register, errors, name: 'y2', defaultValue: 200 }} />
				</Stack>
				<Stack spacing={2}>
					<InputRadio
						{...{ register, errors, name: 'method', choices: EMethod, defaultValue: EMethod.DDA }}
					/>
					<ColorPicker />
				</Stack>
				<SubmitButton>Отрисовать</SubmitButton>
			</SimpleGrid>
		</form>
	);
};