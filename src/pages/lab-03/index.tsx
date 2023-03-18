import { type FC } from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import { SetLineForm } from './ui/form-set-line';
import { Canvas } from './ui';

export const Lab03: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			spacing={4}
		>
			<SetLineForm />
			<Canvas />
		</SimpleGrid>
	);
};
