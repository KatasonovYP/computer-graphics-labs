import { type FC } from 'react';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { PerformantCanvas } from './ui/canvas';
import { CleanButton } from './ui/clean-button';
import { FormFillFigure } from './ui/form-fill-figure';
import { FormAddPoint } from './ui/form-add-point';

export const Lab05: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			gap={4}
		>
			<Stack spacing={4}>
				<FormFillFigure />
				<FormAddPoint />
				<CleanButton />
			</Stack>
			<PerformantCanvas />
		</SimpleGrid>
	);
};
