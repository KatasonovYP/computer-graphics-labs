import { type FC } from 'react';
import { Route, Routes } from 'react-router';
import { lazily } from 'react-lazily';

const { Home } = lazily(async () => await import('./home'));
const { Lab02 } = lazily(async () => await import('./lab-02'));

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
