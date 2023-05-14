import { type KonvaEventObject } from 'konva/lib/Node';

import { type IPosition } from 'shared/model';

import { useShapesStore } from '../store';

type IOnClickDrawHandler = (event: KonvaEventObject<MouseEvent>) => void;
export function useOnClickDrawHandler(): IOnClickDrawHandler {
	const addPointToShape = useShapesStore((state) => state.addPointToShape);
	const addPointToCutter = useShapesStore((state) => state.addPointToCutter);
	const clearCutoff = useShapesStore((state) => state.clearCutoff);

	function onClickDrawHandler(event: KonvaEventObject<MouseEvent>): void {
		const currentPoint: IPosition = event.currentTarget.getRelativePointerPosition();
		currentPoint.x = Math.round(currentPoint.x);
		currentPoint.y = Math.round(currentPoint.y);

		if (event.evt.button === 0) {
			addPointToShape([currentPoint.x, currentPoint.y]);
		}
		if (event.evt.button === 1) {
			addPointToCutter([currentPoint.x, currentPoint.y]);
		}
		clearCutoff();
	}
	return onClickDrawHandler;
}
