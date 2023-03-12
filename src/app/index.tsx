import React from 'react';
import { Routing } from '../pages';
import { withProviders } from './providers';
import Header from "../widgets/header";

const App = () => {
	return (
		<div className="app">
			<Header />
			<Routing />
		</div>
	);
};

export default withProviders(App);
