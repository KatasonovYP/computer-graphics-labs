import { Routing } from '@pages/index';
import { Header } from '@widgets/header';

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
