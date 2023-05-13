import { type FC } from 'react';
import { SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { FormDrawPolygon } from './ui/form-draw-polygon';
import { FormDrawLine } from './ui/form-draw-line';
import { Canvas } from './ui/canvas';
import { ButtonClean } from './ui/button-clean';
import { ButtonCut } from './ui/button-cut';
import { Info } from './ui/info';

export const Lab08: FC = () => {
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
				<Text fontSize='2xl'>set polygon</Text>
				<FormDrawPolygon />
				<ButtonCut />
				<ButtonClean />
				<Info />
			</Stack>

			<Canvas />
		</SimpleGrid>
	);
};
