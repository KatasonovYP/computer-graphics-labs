import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, Stack } from '@chakra-ui/react';

import { ActionInput } from '@shared/components';
import { onPromise } from '@shared/lib/helpers/on-promise';
import { useFigureStore } from '@shared/lib/store';

interface IMoveForm {
	dx: number;
	dy: number;
}

const MoveForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMoveForm>();

	const move = useFigureStore((state) => state.move);

	const onAction: SubmitHandler<IMoveForm> = (data): void => {
		move(Number(data.dx), Number(data.dy));
	};

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<Stack spacing={4}>
				<ActionInput {...{ register, errors, name: 'dx', defaultValue: 10 }} />
				<ActionInput {...{ register, errors, name: 'dy', defaultValue: 15 }} />

				<Button
					variant='solid'
					type='submit'
				>
					Переместить
				</Button>
			</Stack>
		</form>
	);
};

export default MoveForm;
