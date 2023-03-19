import { type FC, type ReactNode } from 'react';
import { Text } from '@chakra-ui/react';

interface Properties {
	children: ReactNode;
}

export const TextAlert: FC<Properties> = ({ children }) => {
	return (
		<Text
			as='b'
			fontSize='sm'
			color='red.300'
		>
			{children}
		</Text>
	);
};
