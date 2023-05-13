import { type FC, useState } from 'react';

import { type KonvaEventObject } from 'konva/lib/Node';

import { Grid } from 'entities';
import { type IPosition } from 'shared/model';

import { chakraColorToHex } from 'shared/lib';

import { useShapesStore } from '../../store';

import { type IRectangle } from '../../model';

import { DrawLines } from './draw-lines';
import { DrawRectangle } from './draw-rectangle';
import { DrawCuts } from './draw-cuts';

export const Canvas: FC = () => {
	const addLine = useShapesStore((state) => state.addLine);
	const setRectangle = useShapesStore((state) => state.setRectangle);
	const [previousPoint, setPreviousPoint] = useState<IPosition | null>(null);

	function drawLineHandler(event: KonvaEventObject<MouseEvent>): void {
		if (previousPoint) {
			addLine({
				points: [previousPoint.x, previousPoint.y, event.evt.offsetX, event.evt.offsetY],
				color: chakraColorToHex('red.300'),
			});
			setPreviousPoint(null);
		} else {
			setPreviousPoint({ x: event.evt.offsetX, y: event.evt.offsetY });
		}
	}

	function drawRectangleHandler(event: KonvaEventObject<MouseEvent>): void {
		if (previousPoint) {
			setRectangle({
				x: previousPoint.x,
				y: previousPoint.y,
				width: event.evt.offsetX - previousPoint.x,
				height: event.evt.offsetY - previousPoint.y,
				color: chakraColorToHex('green.300'),
			});
			setPreviousPoint(null);
		} else {
			setPreviousPoint({ x: event.evt.offsetX, y: event.evt.offsetY });
		}
	}

	function onClickDrawHandler(event: KonvaEventObject<MouseEvent>): void {
		if (event.evt.button === 0) {
			drawLineHandler(event);
		}
		if (event.evt.button === 1) {
			drawRectangleHandler(event);
		}
	}

	return (
		<Grid
			onClickHandler={onClickDrawHandler}
			draggable={false}
		>
			<DrawLines />
			<DrawRectangle />
			<DrawCuts />
		</Grid>
	);
};
