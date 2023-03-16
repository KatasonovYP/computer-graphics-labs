import { ChakraProvider } from '@chakra-ui/react';

import type { ReactNode } from 'react';

export function withChakra(component: () => ReactNode) {
	// eslint-disable-next-line react/function-component-definition
	return function WithChakra() {
		return <ChakraProvider>{component()}</ChakraProvider>;
	};
}
