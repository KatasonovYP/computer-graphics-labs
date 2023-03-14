import { ChakraProvider } from '@chakra-ui/react';

import type { ReactNode } from 'react';

export function withChakra(component: () => ReactNode) {
	return function WithChakra() {
		return <ChakraProvider>{component()}</ChakraProvider>;
	};
}
