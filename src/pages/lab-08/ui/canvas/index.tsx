import { type FC } from 'react';

import { Grid } from 'entities';

import { DrawLines } from './draw-lines';
import { DrawPolygon } from './draw-polygon';
import { DrawCuts } from './draw-cuts';
import { useOneClickDrawHandler } from '../../hooks/use-one-click-draw-handler';
import { DrawPivot } from './draw-pivot';
import { ButtonAddParallels } from '../button-add-parallels';

export const Canvas: FC = () => {
	const onClickDrawHandler = useOneClickDrawHandler();
	return (
		<Grid
			onClickHandler={onClickDrawHandler}
			draggable={true}
			scalable={true}
		>
			<DrawLines />
			<DrawPolygon />
			<DrawCuts />
			<DrawPivot />
		</Grid>
	);
};
