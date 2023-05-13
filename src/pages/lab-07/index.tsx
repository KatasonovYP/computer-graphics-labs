import { type FC } from 'react';
import { SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { FormDrawRect } from './ui/form-draw-rect';
import { FormDrawLine } from './ui/form-draw-line';
import { Canvas } from './ui/canvas';
import { ButtonClean } from './ui/button-clean';
import { ButtonCut } from './ui/button-cut';
import { Info } from './ui/info';

export const Lab07: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			gap={4}
		>
			<Stack spacing={4}>
				<Text fontSize='2xl'>new line</Text>
				<FormDrawLine />
				<Text fontSize='2xl'>set rectangle</Text>
				<FormDrawRect />
				<ButtonCut />
				<ButtonClean />
				<Info />
			</Stack>

			<Canvas />
		</SimpleGrid>
	);
};
