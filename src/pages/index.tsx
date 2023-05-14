import { type FC } from 'react';
import { Route, Routes } from 'react-router';
import { lazily } from 'react-lazily';

const { Home } = lazily(async () => await import('./home'));
const { Lab01 } = lazily(async () => await import('./lab-01'));
const { Lab02 } = lazily(async () => await import('./lab-02'));
const { Lab03 } = lazily(async () => await import('./lab-03'));
const { Lab04 } = lazily(async () => await import('./lab-04'));
const { Lab05 } = lazily(async () => await import('./lab-05'));
const { Lab06 } = lazily(async () => await import('./lab-06'));
const { Lab07 } = lazily(async () => await import('./lab-07'));
const { Lab08 } = lazily(async () => await import('./lab-08'));
const { Lab09 } = lazily(async () => await import('./lab-09'));
// const { Lab10 } = lazily(async () => await import('./lab-10'));

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
			<Route
				path='/lab-06'
				element={<Lab06 />}
			/>
			<Route
				path='/lab-07'
				element={<Lab07 />}
			/>
			<Route
				path='/lab-08'
				element={<Lab08 />}
			/>
			<Route
				path='/lab-09'
				element={<Lab09 />}
			/>
			{/* <Route */}
			{/* 	path='/lab-10' */}
			{/* 	element={<Lab10 />} */}
			{/* /> */}
		</Routes>
	);
};
