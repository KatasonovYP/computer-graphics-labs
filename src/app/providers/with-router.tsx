import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

export function withRouter(component: () => React.ReactNode) {
	return function WithRouter() {
		return (
			<BrowserRouter>
				<Suspense fallback={<Spinner size="xl" />}>{component()}</Suspense>
			</BrowserRouter>
		);
	};
}
