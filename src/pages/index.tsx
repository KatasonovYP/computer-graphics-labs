import { type FC } from 'react';
import { Route, Routes } from 'react-router';
import { lazily } from 'react-lazily';

const { Home } = lazily(async () => await import('./home'));
const { Lab01 } = lazily(async () => await import('./lab-01'));
const { Lab02 } = lazily(async () => await import('./lab-02'));
const { Lab03 } = lazily(async () => await import('./lab-03'));
const { Lab04 } = lazily(async () => await import('./lab-04'));
const { Lab05 } = lazily(async () => await import('./lab-05'));

export const Routing: FC = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/lab-01'
				element={<Lab01 />}
			/>
			<Route
				path='/lab-02'
				element={<Lab02 />}
			/>
			<Route
				path='/lab-03'
				element={<Lab03 />}
			/>
			<Route
				path='/lab-04'
				element={<Lab04 />}
			/>
			<Route
				path='/lab-05'
				element={<Lab05 />}
			/>
		</Routes>
	);
};
