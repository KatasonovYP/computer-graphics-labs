import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

export const withChakra = (component: () => ReactNode) => () => {
	return <ChakraProvider>{component()}</ChakraProvider>;
};
