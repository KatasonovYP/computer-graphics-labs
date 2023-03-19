import { type Dispatch, type FC, type SetStateAction } from 'react';
import { Button, SimpleGrid } from '@chakra-ui/react';
import { type FieldValues, type Path } from 'react-hook-form';

const colors = [
	'gray.500',
	'red.500',
	'gray.700',
	'green.500',
	'blue.500',
	'blue.800',
	'yellow.500',
	'orange.500',
	'purple.500',
	'pink.500',
];

interface Properties<T extends FieldValues> {
	// setValue: UseFormSetValue<T>;
	setValue: any;
	name: Path<T>;
	setColor: Dispatch<SetStateAction<string>>;
}

type customFC = FC<Properties<Record<string, unknown>>>;

export const ColorPopoverPalette: customFC = <T extends FieldValues>({ setValue, setColor }: Properties<T>) => {
	return (
		<SimpleGrid
			columns={5}
			spacing={2}
		>
			{colors.map((c) => (
				<Button
					key={c}
					aria-label={c}
					background={c}
					height='22px'
					width='22px'
					padding={0}
					minWidth='unset'
					borderRadius={3}
					_hover={{ background: c }}
					onClick={() => {
						setColor(c);
						setValue('color', c);
					}}
				></Button>
			))}
		</SimpleGrid>
	);
};
