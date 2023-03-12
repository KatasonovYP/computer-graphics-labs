import { Route, Routes } from 'react-router';
import { lazy } from 'react';

const Home = lazy(() => import('./Home'));
const Lab01 = lazy(() => import("./lab-01"));

export const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/lab-01" element={<Lab01 />} />
		</Routes>
	);
};
