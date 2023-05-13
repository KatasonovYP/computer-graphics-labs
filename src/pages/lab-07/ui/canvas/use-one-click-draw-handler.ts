import { type KonvaEventObject } from 'konva/lib/Node';

import { chakraColorToHex } from 'shared/lib';

import { type IPosition } from 'shared/model';

import { useShapesStore } from '../../store';

type IOnClickDrawHandler = (event: KonvaEventObject<MouseEvent>) => void;

export function useOneClickDrawHandler(): IOnClickDrawHandler {
	const addLine = useShapesStore((state) => state.addLine);
	const clearCuts = useShapesStore((state) => state.clearCuts);
	const setRectangle = useShapesStore((state) => state.setRectangle);
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

	function drawRectangleHandler(event: KonvaEventObject<MouseEvent>, currentPoint: IPosition): void {
		if (previousPoint) {
			const width = currentPoint.x - previousPoint.x;
			const height = currentPoint.y - previousPoint.y;
			setRectangle({
				x: width > 0 ? previousPoint.x : currentPoint.x,
				y: height > 0 ? previousPoint.y : currentPoint.y,
				width: Math.abs(width),
				height: Math.abs(height),
				color: chakraColorToHex('green.300'),
			});
			setPreviousPoint(null);
			clearCuts();
		} else {
			setPreviousPoint(currentPoint);
		}
	}

	function onClickDrawHandler(event: KonvaEventObject<MouseEvent>): void {
		const currentPoint: IPosition = event.currentTarget.getRelativePointerPosition();

		if (event.evt.ctrlKey) {
			setPreviousPoint(currentPoint);
			return;
		}

		if (event.evt.button === 0) {
			drawLineHandler(event, currentPoint);
		}
		if (event.evt.button === 1) {
			drawRectangleHandler(event, currentPoint);
		}
	}

	return onClickDrawHandler;
}
