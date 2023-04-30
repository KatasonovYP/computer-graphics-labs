import { type FC } from 'react';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { PerformantCanvas } from './ui/canvas';
import { CleanButton } from './ui/clean-button';
import { FormFillFigure } from './ui/form-fill-figure';
import { FormAddPoint } from './ui/form-add-point';
import { FormSeedPixel } from './ui/form-seed-pixel';

export const Lab06: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			gap={4}
		>
			<Stack spacing={4}>
				<FormAddPoint />
				<FormSeedPixel />
				<FormFillFigure />
				<CleanButton />
			</Stack>
			<PerformantCanvas />
		</SimpleGrid>
	);
};
