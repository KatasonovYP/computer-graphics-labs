import { type FC } from 'react';

import { Grid } from 'entities';

import { DrawLines } from './draw-lines';

export const Canvas: FC = () => {
	return (
		<Grid>
			<DrawLines />
		</Grid>
	);
};
