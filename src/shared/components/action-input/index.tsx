import { type FC } from 'react';
import { type FieldErrors, type FieldValues, type Path, type UseFormRegister } from 'react-hook-form';
import { Input } from '@chakra-ui/react';

import { numberRegExp } from '@shared/config/regex';

interface Props<T extends FieldValues> {
	name: Path<T>;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	defaultValue?: number;
}

export const ActionInput: FC<Props<any>> = <T extends FieldValues>({
	name,
	register,
	errors,
	defaultValue,
}: Props<T>) => {
	return (
		<>
			<Input
				id='standard-basic'
				placeholder={`Введите ${name}`}
				variant='flushed'
				defaultValue={defaultValue}
				{...register(name, { required: true, pattern: numberRegExp })}
			/>
			{errors[name]?.type === 'required' && (
				<p
					className='err'
					role='alert'
				>
					Поле {name} необходимо
				</p>
			)}
			{errors[name]?.type === 'pattern' && (
				<p
					className='err'
					role='alert'
				>
					Введите корректное число
				</p>
			)}
		</>
	);
};
