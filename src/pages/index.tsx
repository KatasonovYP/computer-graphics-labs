import { Route, Routes } from 'react-router';
import { lazy } from 'react';

const Home = lazy(() => import('./Home'));
const Lab02 = lazy(() => import('./lab-02'));

export const Routing = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/lab-02"
				element={<Lab02 />}
			/>
		</Routes>
	);
};
