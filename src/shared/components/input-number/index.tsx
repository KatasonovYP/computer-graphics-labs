import { type FC } from 'react';
import { type FieldErrors, type FieldValues, type Path, type UseFormRegister } from 'react-hook-form';
import { Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react';

import { numberRegExp } from 'shared/config';

import { TextAlert } from '../text-alert';

interface NumberInputProperties<T extends FieldValues> {
	name: Path<T>;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	defaultValue?: number;
}

// replace any to Record<string, unknown>
type customFC = FC<NumberInputProperties<any>>;

export const NumberInput: customFC = <T extends FieldValues>({
	name,
	register,
	errors,
	defaultValue,
}: NumberInputProperties<T>) => {
	console.log();
	return (
		<>
			<Stack
				direction={'row'}
				spacing={4}
			>
				<InputGroup>
					<InputLeftAddon>{name}</InputLeftAddon>
					<Input
						id='standard-basic'
						placeholder={`Введите ${name}`}
						errorBorderColor='red.300'
						isInvalid={errors[name] !== undefined}
						variant='flushed'
						defaultValue={defaultValue}
						{...register(name, { required: true, pattern: numberRegExp })}
					/>
				</InputGroup>
			</Stack>
			{errors[name]?.type === 'required' && <TextAlert>Поле {name} необходимо</TextAlert>}
			{errors[name]?.type === 'pattern' && <TextAlert>Введите корректное число</TextAlert>}
		</>
	);
};
