import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { ColorPicker, InputRadio, NumberInput, SubmitButton } from 'shared/components';
import { chakraColorToHex, EDrawLineMethod, onPromise } from 'shared/lib';

import { type IOOPoint, OOLine, OOPoint } from 'shared/model';

import { useLinesStore } from '../store/lines-store';

interface ISetLinesForm {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	method: EDrawLineMethod;
	color: string;
}

export const SetLineForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<ISetLinesForm>();

	const pushLine = useLinesStore((state) => state.push);
	const setTarget = useLinesStore((state) => state.setTarget);

	const onAction: SubmitHandler<ISetLinesForm> = (data): void => {
		const a: IOOPoint = OOPoint.new(+data.x1, +data.y1);
		const b: IOOPoint = OOPoint.new(+data.x2, +data.y2);

		const hex = chakraColorToHex(data.color);

		const line = OOLine.new(a, b, hex, data.method);
		setTarget(line);
		pushLine(line);
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
					<InputRadio {...{ register, errors, name: 'method', choices: EDrawLineMethod }} />
				</Stack>
				<Stack
					spacing={2}
					direction='row'
					align='center'
				>
					<Text textAlign='center'>Выбор цвета</Text>
					<ColorPicker {...{ setValue, register, errors, name: 'color' }} />
				</Stack>
				<SubmitButton>Отрисовать</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
