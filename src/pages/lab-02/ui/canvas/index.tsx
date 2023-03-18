import { type FC } from 'react';

import { Grid } from 'entities';

import { DrawCenter } from '../draw-center';
import { DrawEdges } from '../draw-edges';
import { DrawNose } from '../draw-noze';

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
