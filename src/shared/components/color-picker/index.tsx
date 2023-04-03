import { Stack, Text } from '@chakra-ui/react';
import { type FC } from 'react';

import {
	type FieldErrors,
	type FieldValues,
	type Path,
	type UseFormRegister,
	type UseFormSetValue,
} from 'react-hook-form';

import { TextAlert } from '../text-alert';

import { ColorPopover } from './ui';

interface Properties<T extends FieldValues> {
	name: Path<T>;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	setValue: UseFormSetValue<T>;
	defaultValue?: string;
}

export const ColorPicker: FC<Properties<any>> = <T extends FieldValues>({
	name,
	register,
	errors,
	setValue,
	defaultValue = 'gray.500',
}: Properties<T>) => {
	return (
		<>
			<Stack
				spacing={2}
				direction={'row'}
			>
				<Text>Выберете цвет: </Text>
				<ColorPopover {...{ name, register, errors, setValue, defaultValue }} />
			</Stack>

			{errors[name]?.type === 'required' && <TextAlert>Поле {name} необходимо</TextAlert>}
			{errors[name]?.type === 'pattern' && <TextAlert>Выберете корректный цвет</TextAlert>}
		</>
	);
};
