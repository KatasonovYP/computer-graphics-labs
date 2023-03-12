import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

export const withRouter = (component: () => React.ReactNode) => () => {
    return (
		<BrowserRouter>
			<Suspense fallback={<Spinner size="xl" />}>{component()}</Suspense>
		</BrowserRouter>
	);
};
