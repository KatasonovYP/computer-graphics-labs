import { Box } from '@chakra-ui/react';
import { type FC, type ReactNode } from 'react';

interface Properties {
	children: ReactNode;
}

export const Stroke: FC<Properties> = ({ children }: Properties) => {
	return (
		<Box
			maxHeight={'fit-content'}
			maxWidth={'fit-content'}
		>
			<Box
				border='2px'
				padding={0.5}
				borderColor={'black'}
				borderRadius={'10px'}
				maxHeight={'min-content'}
				maxWidth={'min-content'}
			>
				{children}
			</Box>
		</Box>
	);
};
