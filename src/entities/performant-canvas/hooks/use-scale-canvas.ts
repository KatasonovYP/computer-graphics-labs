import { useState, type WheelEvent } from 'react';

export type moveCanvasHandlerType = (event: WheelEvent<HTMLCanvasElement>) => void;

export function useScaleCanvas(): [number, moveCanvasHandlerType] {
	const [scale, setScale] = useState(1);

	function scaleCanvas(event: WheelEvent<HTMLCanvasElement>): void {
		event.target.removeEventListener('onclick', null);
		const scaleBy = 1.02;
		const newScale = event.deltaY < 0 ? scale * scaleBy : scale / scaleBy;
		if (newScale >= 1) {
			setScale(newScale);
		}
	}

	return [scale, scaleCanvas];
}
