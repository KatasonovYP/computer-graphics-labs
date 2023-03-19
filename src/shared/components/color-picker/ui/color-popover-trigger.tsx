import { type FC } from 'react';
import { Button, PopoverTrigger } from '@chakra-ui/react';

interface Properties {
	color: string;
}

export const ColorPopoverTrigger: FC<Properties> = ({ color }) => {
	return (
		<PopoverTrigger>
			<Button
				aria-label={color}
				background={color}
				height='22px'
				width='22px'
				padding={0}
				minWidth='unset'
				borderRadius={3}
			></Button>
		</PopoverTrigger>
	);
};
