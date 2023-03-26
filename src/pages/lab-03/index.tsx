import { type FC } from 'react';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { lazily } from 'react-lazily';

import { Canvas, FormClear, RotateLineForm, SetLineForm } from './ui';

const { ModalStepsInfo } = lazily(async () => await import('./ui/modal-steps-info'));

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
					<ModalStepsInfo />
					<FormClear />
				</Stack>
			</Stack>
			<Canvas />
		</SimpleGrid>
	);
};
