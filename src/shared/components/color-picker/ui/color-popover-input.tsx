import { Input } from '@chakra-ui/react';
import { type Dispatch, type FC, type SetStateAction } from 'react';

import { type FieldValues, type Path, type UseFormRegister } from 'react-hook-form';

interface Properties<T extends FieldValues> {
	name: Path<T>;
	register: UseFormRegister<T>;
	color: string;
	setColor: Dispatch<SetStateAction<string>>;
}

// replace any to Record<string, unknown>>
type customFC = FC<Properties<any>>;
export const ColorPopoverInput: customFC = <T extends FieldValues>({
	name,
	register,
	color,
	setColor,
}: Properties<T>) => {
	return (
		<Input
			borderRadius={3}
			marginTop={3}
			placeholder='red.100'
			size='sm'
			value={color}
			{...register(name)}
			onChange={(event) => {
				setColor(event.target.value);
			}}
		/>
	);
};
