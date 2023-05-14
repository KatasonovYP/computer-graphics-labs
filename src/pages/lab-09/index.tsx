import { type FC } from 'react';
import { SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { FormDrawCutter } from './ui/form-draw-cutter';
import { Canvas } from './ui/canvas';
import { ButtonClean } from './ui/button-clean';
import { ButtonCut } from './ui/button-cut';
import { Info } from './ui/info';
import { FormDrawShape } from './ui/form-draw-shape';

export const Lab09: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			gap={4}
		>
			<Stack spacing={4}>
				<Text fontSize='2xl'>Set shape</Text>
				<FormDrawShape />
				<Text fontSize='2xl'>Set polygon</Text>
				<FormDrawCutter />
				<ButtonCut />
				<ButtonClean />
				<Info />
			</Stack>

			<Canvas />
		</SimpleGrid>
	);
};
