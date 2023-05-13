import { type FC } from 'react';

import { Grid } from 'entities';

import { DrawLines } from './draw-lines';
import { DrawRectangle } from './draw-rectangle';
import { DrawCuts } from './draw-cuts';
import { useOneClickDrawHandler } from './use-one-click-draw-handler';
import { DrawPivot } from './draw-pivot';

export const Canvas: FC = () => {
	const onClickDrawHandler = useOneClickDrawHandler();
	return (
		<Grid
			onClickHandler={onClickDrawHandler}
			draggable={true}
			scalable={true}
		>
			<DrawLines />
			<DrawRectangle />
			<DrawCuts />
			<DrawPivot />
		</Grid>
	);
};
