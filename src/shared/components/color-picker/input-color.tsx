import { type FC } from 'react';
import { type FieldValues, type Path, type UseFormRegister } from 'react-hook-form';
import { Input } from '@chakra-ui/react';

interface Properties<T extends FieldValues> {
	name: Path<T>;
	register: UseFormRegister<T>;
	defaultValue?: string;
}

export const InputColor: FC<Properties<any>> = <T extends FieldValues>({
	name,
	register,
	defaultValue,
}: Properties<T>) => {
	return (
		<>
			<Input
				borderRadius={3}
				marginTop={3}
				placeholder='red.100'
				size='sm'
				defaultValue={defaultValue}
				{...register(name)}
			/>
		</>
	);
};
