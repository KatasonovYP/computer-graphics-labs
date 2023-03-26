import { type FC } from 'react';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { Canvas, FormClear, RotateLineForm, SetLineForm } from './ui';
import { ModalChartsSteps } from './ui/modal-charts-steps';

export const Lab03: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			spacing={4}
		>
			<Stack spacing={8}>
				<SetLineForm />
				<RotateLineForm />
				<Stack
					spacing={4}
					direction='row'
				>
					<ModalChartsSteps />
					<FormClear />
				</Stack>
			</Stack>
			<Canvas />
		</SimpleGrid>
	);
};
