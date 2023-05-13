import { type KonvaEventObject } from 'konva/lib/Node';
import { type Dispatch, type SetStateAction } from 'react';

import { type IStage } from '../model/types';

type IScaleHandler = (event: KonvaEventObject<WheelEvent>) => void;

export function useScaleHandler(stage: IStage, setStage: Dispatch<SetStateAction<IStage>>): IScaleHandler {
	return (event: KonvaEventObject<WheelEvent>): void => {
		event.evt.preventDefault();

		const scaleBy = 1.02;
		const newStage = event.target.getStage();

		if (newStage === null) return;

		const pointer = newStage.getPointerPosition();

		if (pointer === null) return;

		const oldScale = stage.scale;
		const mousePointTo = {
			x: (pointer.x - newStage.x()) / oldScale,
			y: (pointer.y - newStage.y()) / oldScale,
		};

		const newScale = event.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

		setStage({
			...stage,
			x: pointer.x - mousePointTo.x * newScale,
			y: pointer.y - mousePointTo.y * newScale,
			scale: newScale,
		});
	};
}
