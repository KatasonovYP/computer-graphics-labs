import { Box } from '@chakra-ui/react';
import { type FC, type ReactNode } from 'react';

interface Properties {
	children: ReactNode;
}

export const Stroke: FC<Properties> = ({ children }: Properties) => {
	return (
		<Box
			border='2px'
			borderColor={'black'}
			borderRadius={'10px'}
			maxHeight={500}
		>
			{children}
		</Box>
	);
};
