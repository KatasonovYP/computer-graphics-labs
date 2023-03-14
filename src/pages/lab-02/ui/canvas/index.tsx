import React, { FC } from 'react';
import { Grid } from '@entities/grid';
import DrawEdges from '@pages/lab-02/ui/draw-edges';
import DrawNose from '@pages/lab-02/ui/draw-noze';
import DrawCenter from '@pages/lab-02/ui/draw-center';

export const Canvas: FC = () => {
	const width = Math.min(window.screen.availWidth - 20, 500);
	return (
		<Grid sideLength={width}>
			<DrawEdges />
			{/*<DrawPoints />*/}
			<DrawNose />
			<DrawCenter />
		</Grid>
	);
};
