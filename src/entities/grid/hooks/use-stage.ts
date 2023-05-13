import { type Dispatch, type SetStateAction, useState } from 'react';

import { type IStage } from '../model/types';

export function useStage(): { stage: IStage; setStage: Dispatch<SetStateAction<IStage>> } {
	const sideLength = Math.min(window.screen.availWidth - 20, 500);
	const [stage, setStage] = useState<IStage>({
		x: 0,
		y: 0,
		width: sideLength,
		height: sideLength,
		scale: 1,
	});
	return { stage, setStage };
}
