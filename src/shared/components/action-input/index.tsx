import React from 'react';
import { Input } from '@chakra-ui/react';
import { numberRegExp } from '@shared/config/regex';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
	name: Path<T>;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	defaultValue?: number;
}

const ActionInput = <T extends FieldValues>({ name, register, errors, defaultValue }: Props<T>) => {
	return (
		<>
			<Input
				id="standard-basic"
				placeholder={`Введите ${name}`}
				variant='flushed'
				defaultValue={defaultValue}
				{...register(name, { required: true, pattern: numberRegExp })}
			/>
			{errors[name]?.type === 'required' && (
				<p className="err" role="alert">
					Поле {name} необходимо
				</p>
			)}
			{errors[name]?.type === 'pattern' && (
				<p className="err" role="alert">
					Введите корректное число
				</p>
			)}
		</>
	);
};

export default ActionInput;
