import { type FC } from 'react';

import { Grid } from 'entities';

import { useOnClickDrawHandler } from '../../hooks/use-on-click-draw-handler';

import { useShapesStore } from '../../store';

import { DrawPolygon } from './draw-polygon';
import { DrawPolygonPoints } from './draw-polygon-points';

export const Canvas: FC = () => {
	const onClickDrawHandler = useOnClickDrawHandler();
	const shape = useShapesStore((state) => state.shape);
	const cutter = useShapesStore((state) => state.cutter);
	const cutoff = useShapesStore((state) => state.cutoff);
	const isClosedShape = useShapesStore((state) => state.isClosedShape);
	const isClosedCutter = useShapesStore((state) => state.isClosedCutter);
	return (
		<Grid
			onClickHandler={onClickDrawHandler}
			draggable={true}
			scalable={true}
		>
			<DrawPolygon
				polygon={shape}
				color='#4F4'
			/>
			<DrawPolygon
				polygon={cutter}
				color='#44F'
			/>
			<DrawPolygon
				polygon={cutoff}
				color='#F44'
			/>
			<DrawPolygonPoints
				polygon={shape}
				isClosed={isClosedShape}
				color='#484'
			/>
			<DrawPolygonPoints
				polygon={cutter}
				isClosed={isClosedCutter}
				color='#448'
			/>
		</Grid>
	);
};
