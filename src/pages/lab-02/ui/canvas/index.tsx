import { type FC } from 'react';

import { Grid } from 'entities';

import { DrawCenter } from '../figures/draw-center';
import { DrawEdges } from '../figures/draw-edges';
import { DrawNose } from '../figures/draw-noze';

export const Canvas: FC = () => {
	return (
		<Grid>
			<DrawEdges />
			{/* <DrawPoints /> */}
			<DrawNose />
			<DrawCenter />
		</Grid>
	);
};
