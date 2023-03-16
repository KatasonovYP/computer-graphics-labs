import { type FC } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';

import { PivotForm } from './ui/form-pivot';

import { Canvas } from './ui/canvas';
import { MoveForm } from './ui/form-move';
import { RotateForm } from './ui/form-rotate';
import { ScaleForm } from './ui/form-scale';

export const Lab02: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			spacing={4}
		>
			{/* <Text fontSize="3xl">Лабораторная работа №2</Text> */}
			<SimpleGrid
				columns={[1, null, 2]}
				spacing={4}
			>
				<MoveForm />
				<ScaleForm />
				<RotateForm />
				<PivotForm />
			</SimpleGrid>

			<Box
				border='2px'
				borderColor={'black'}
				borderRadius={'10px'}
			>
				<Canvas />
			</Box>
		</SimpleGrid>
	);
};
