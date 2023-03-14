import { type FC, lazy } from 'react';
import { Route, Routes } from 'react-router';

const Home = lazy(async () => await import('./Home'));
const Lab02 = lazy(async () => await import('./lab-02'));

export const Routing: FC = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/lab-02'
				element={<Lab02 />}
			/>
		</Routes>
	);
};
