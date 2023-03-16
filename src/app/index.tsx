import { Routing } from 'pages';
import { Header } from 'widgets';

import { withProviders } from './providers';

import type { FC } from 'react';

const App: FC = () => {
	return (
		<div className='app'>
			<Header />
			<Routing />
		</div>
	);
};

// eslint-disable-next-line import/no-default-export
export default withProviders(App);
