import { type ReactNode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

export function withRouter(component: () => ReactNode) {
	// eslint-disable-next-line react/function-component-definition
	return function WithRouter() {
		return (
			<BrowserRouter>
				<Suspense fallback={<Spinner size='xl' />}>{component()}</Suspense>
			</BrowserRouter>
		);
	};
}
