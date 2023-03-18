import { type FC } from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import { Canvas, ShapeController } from './ui';

export const Lab02: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			spacing={4}
		>
			{/* <Text fontSize='3xl'>Лабораторная работа №2</Text> */}
			<ShapeController />
			<Canvas />
		</SimpleGrid>
	);
};
