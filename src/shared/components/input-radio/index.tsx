import { type FC } from 'react';
import { type FieldErrors, type FieldValues, type Path, type UseFormRegister } from 'react-hook-form';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

import { TextAlert } from '../text-alert';

interface Properties<T extends FieldValues> {
	name: Path<T>;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	choices: object;
	defaultValue?: string;
}

export const InputRadio: FC<Properties<any>> = <T extends FieldValues>({
	name,
	register,
	errors,
	choices,
	defaultValue = Object.values(choices)[0],
}: Properties<T>) => {
	return (
		<>
			<RadioGroup defaultValue={defaultValue}>
				<Stack spacing={2}>
					{Object.values(choices).map((choice: string, key) => (
						<Radio
							key={key}
							value={choice}
							{...register(name, { required: true })}
						>
							{choice}
						</Radio>
					))}
				</Stack>
			</RadioGroup>
			{errors[name]?.type === 'required' && <TextAlert>Поле {name} необходимо</TextAlert>}
		</>
	);
};
