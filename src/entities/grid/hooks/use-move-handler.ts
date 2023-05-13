import { type KonvaEventObject } from 'konva/lib/Node';
import { type Dispatch, type SetStateAction } from 'react';

import { type IStage } from '../model/types';

type IMoveHandler = (event: KonvaEventObject<MouseEvent>) => void;

export function useMoveHandler(setStage: Dispatch<SetStateAction<IStage>>): IMoveHandler {
	return (event: KonvaEventObject<MouseEvent>): void => {
		const pos = event.currentTarget.position();
		const x = pos.x;
		const y = pos.y;
		setStage((previousStage) => {
			return { ...previousStage, x, y };
		});
	};
}
