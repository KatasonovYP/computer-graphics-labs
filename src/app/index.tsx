import type { FC } from 'react';
import { Routing } from '@pages/index';
import { Header } from '@widgets/header';

import { withProviders } from './providers';

const App: FC = () => {
	return (
		<div className="app">
			<Header />
			<Routing />
		</div>
	);
};

export default withProviders(App);
