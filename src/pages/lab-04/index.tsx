import { type FC } from 'react';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { PerformantCanvas } from './ui/canvas';
import { FormCircle } from './ui/form-circle';
import { FormCircleSpectrum } from './ui/form-circle-spectrum';
import { CleanButton } from './ui/clean-button';
import { FormEllipse } from './ui/form-ellipse';

export const Lab04: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			spacing={4}
		>
			<Stack spacing={4}>
				<FormCircle />
				<FormCircleSpectrum />
				<FormEllipse />
				<CleanButton />
			</Stack>
			<PerformantCanvas />
		</SimpleGrid>
	);
};
