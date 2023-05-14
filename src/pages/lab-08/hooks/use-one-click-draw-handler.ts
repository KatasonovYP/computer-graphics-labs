import { type KonvaEventObject } from 'konva/lib/Node';

import { useState } from 'react';

import { chakraColorToHex } from 'shared/lib';

import { type IPosition } from 'shared/model';

import { useShapesStore } from '../store';

type IOnClickDrawHandler = (event: KonvaEventObject<MouseEvent>) => void;
export function useOneClickDrawHandler(): IOnClickDrawHandler {
	const addLine = useShapesStore((state) => state.addLine);
	const clearCuts = useShapesStore((state) => state.clearCuts);
	const addPointToPolygon = useShapesStore((state) => state.addPointToPolygon);
	const previousPoint = useShapesStore((state) => state.pivot);
	const setPreviousPoint = useShapesStore((state) => state.setPivot);

	function drawLineHandler(event: KonvaEventObject<MouseEvent>, currentPoint: IPosition): void {
		if (previousPoint) {
			addLine({
				points: [previousPoint.x, previousPoint.y, currentPoint.x, currentPoint.y],
				color: chakraColorToHex('red.300'),
			});
			setPreviousPoint(null);
		} else {
			setPreviousPoint(currentPoint);
		}
	}

	function drawPolygonHandler(event: KonvaEventObject<MouseEvent>, currentPoint: IPosition): void {
		addPointToPolygon([currentPoint.x, currentPoint.y]);
		clearCuts();
	}

	function onClickDrawHandler(event: KonvaEventObject<MouseEvent>): void {
		const currentPoint: IPosition = event.currentTarget.getRelativePointerPosition();
		currentPoint.x = Math.round(currentPoint.x);
		currentPoint.y = Math.round(currentPoint.y);

		if (event.evt.button === 0) {
			drawLineHandler(event, currentPoint);
		}
		if (event.evt.button === 1) {
			drawPolygonHandler(event, currentPoint);
		}
	}
	return onClickDrawHandler;
}
