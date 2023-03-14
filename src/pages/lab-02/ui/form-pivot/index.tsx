import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Stack } from '@chakra-ui/react';
import { ActionInput } from '@shared/components';
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

	const onAction: SubmitHandler<IMoveForm> = (data) => {
		setPivot(Number(data.x), Number(data.y));
	};

	return (
		<form onSubmit={handleSubmit(onAction)}>
			<Stack spacing={2}>
				<ActionInput {...{ register, errors, name: 'x', defaultValue: 150 }} />
				<ActionInput {...{ register, errors, name: 'y', defaultValue: 150 }} />

				<Button
					variant="solid"
					type="submit"
				>
					Поставить центр
				</Button>
			</Stack>
		</form>
	);
};

export default PivotForm;
