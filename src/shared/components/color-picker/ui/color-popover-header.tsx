import { type FC } from 'react';
import { Center, PopoverArrow, PopoverCloseButton, PopoverHeader } from '@chakra-ui/react';

interface Properties {
	color: string;
}

export const ColorPopoverHeader: FC<Properties> = ({ color }) => {
	return (
		<>
			<PopoverArrow bg={color} />
			<PopoverCloseButton color='white' />
			<PopoverHeader
				height='100px'
				backgroundColor={color}
				borderTopLeftRadius={5}
				borderTopRightRadius={5}
				color='white'
			>
				<Center height='100%'>{color}</Center>
			</PopoverHeader>
		</>
	);
};
