import { type FC } from 'react';
import { Heading, SimpleGrid } from '@chakra-ui/react';

export const Home: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			spacing={4}
		>
			<Heading size={'2xl'}>Home</Heading>
		</SimpleGrid>
	);
};
