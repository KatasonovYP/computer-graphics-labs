import { type FC } from 'react';

import { Grid } from 'entities';

import DrawCenter from '../draw-center';
import DrawEdges from '../draw-edges';
import DrawNose from '../draw-noze';

export const Canvas: FC = () => {
	const width = Math.min(window.screen.availWidth - 20, 500);
	return (
		<Grid sideLength={width}>
			<DrawEdges />
			{/* <DrawPoints /> */}
			<DrawNose />
			<DrawCenter />
		</Grid>
	);
};
