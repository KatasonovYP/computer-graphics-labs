import { Popover, PopoverBody, PopoverContent } from '@chakra-ui/react';
import { type FC, useState } from 'react';

import {
	type FieldErrors,
	type FieldValues,
	type Path,
	type UseFormRegister,
	type UseFormSetValue,
} from 'react-hook-form';

import { ColorPopoverHeader, ColorPopoverInput, ColorPopoverPalette, ColorPopoverTrigger } from './';

interface Properties<T extends FieldValues> {
	name: Path<T>;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	setValue: UseFormSetValue<T>;
	defaultValue?: string;
}

export const ColorPopover: FC<Properties<any>> = <T extends FieldValues>({
	name,
	register,
	errors,
	setValue,
	defaultValue = 'gray.500',
}: Properties<T>) => {
	const [color, setColor] = useState(defaultValue);
	return (
		<Popover variant='picker'>
			<ColorPopoverTrigger color={color} />
			<PopoverContent width='170px'>
				<ColorPopoverHeader color={color} />
				<PopoverBody height='120px'>
					<ColorPopoverPalette {...{ setValue, name, setColor }} />
					<ColorPopoverInput {...{ register, name, errors, color, setColor }} />
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};
