import type { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

export function withChakra(component: () => ReactNode) {
	return function WithChakra() {
		return <ChakraProvider>{component()}</ChakraProvider>;
	};
}
