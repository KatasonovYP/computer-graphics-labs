import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, Stack } from '@chakra-ui/react';

import { ActionInput } from '@shared/components';
import { onPromise } from '@shared/lib/helpers/on-promise';
import { useFigureStore } from '@shared/lib/store';

interface IMoveForm {
	x: number;
	y: number;
}

const PivotForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMoveForm>();

	const setPivot = useFigureStore((state) => state.setPivot);

	const onAction: SubmitHandler<IMoveForm> = (data): void => {
		setPivot(Number(data.x), Number(data.y));
	};

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<Stack spacing={2}>
				<ActionInput {...{ register, errors, name: 'x', defaultValue: 150 }} />
				<ActionInput {...{ register, errors, name: 'y', defaultValue: 150 }} />

				<Button
					variant='solid'
					type='submit'
				>
					Поставить центр
				</Button>
			</Stack>
		</form>
	);
};

export default PivotForm;
