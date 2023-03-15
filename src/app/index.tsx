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

export default withProviders(App);
