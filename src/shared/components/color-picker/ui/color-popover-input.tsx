import { Input } from '@chakra-ui/react';
import { type Dispatch, type FC, type SetStateAction } from 'react';

import { type FieldErrors, type FieldValues, type Path, type UseFormRegister } from 'react-hook-form';

const chakraColorRegExp = /^(red|blue|green|yellow|gray|purple|pink)(.\d00)?$/;

interface Properties<T extends FieldValues> {
	name: Path<T>;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	color: string;
	setColor: Dispatch<SetStateAction<string>>;
}

// replace any to Record<string, unknown>>
type customFC = FC<Properties<any>>;
export const ColorPopoverInput: customFC = <T extends FieldValues>({
	name,
	register,
	errors,
	color,
	setColor,
}: Properties<T>) => {
	return (
		<Input
			borderRadius={3}
			marginTop={3}
			placeholder='red.100'
			errorBorderColor='red.300'
			isInvalid={errors[name] !== undefined}
			size='sm'
			value={color}
			{...register(name, { required: true, pattern: chakraColorRegExp })}
			onChange={(event) => {
				setColor(event.target.value);
			}}
		/>
	);
};
