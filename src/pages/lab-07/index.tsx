import { type FC } from 'react';
import { SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { FormDrawRect } from './ui/form-draw-rect';
import { FormDrawLine } from './ui/form-draw-line';
import { Canvas } from './ui/canvas';
import { ButtonClean } from './ui/button-clean';
import { ButtonCut } from './ui/button-cut';

export const Lab07: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			gap={4}
		>
			<Stack spacing={4}>
				<Text fontSize='2xl'>new line form</Text>
				<FormDrawLine />
				<Text fontSize='2xl'>set rectangle form</Text>
				<FormDrawRect />
				<ButtonCut />
				<ButtonClean />
			</Stack>

			<Canvas />
		</SimpleGrid>
	);
};
