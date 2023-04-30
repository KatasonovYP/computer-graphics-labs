import { type MouseEvent, type RefObject } from 'react';

import { type IPosition } from 'shared/model';

import { useFiguresStore } from '../../store';

export function useClickHandle(
	centerPosition: IPosition,
	canvasReference: RefObject<HTMLCanvasElement>,
): (event: MouseEvent<HTMLCanvasElement>) => void {
	const addPoint = useFiguresStore((state) => state.addPoint);
	const closeFigure = useFiguresStore((state) => state.closeFigure);
	const setSeedPixel = useFiguresStore((state) => state.setSeedPixel);

	function clickHandle(event: MouseEvent<HTMLCanvasElement>): void {
		const rect = canvasReference.current?.getBoundingClientRect();
		if (!rect) return;
		const x = Math.round(event.clientX - rect.left) - centerPosition.x;
		const y = Math.round(event.clientY - rect.top) - centerPosition.y;

		if (event.altKey) {
			closeFigure();
		} else if (event.shiftKey) {
			setSeedPixel({ x, y });
		} else if (!event.ctrlKey) {
			addPoint({ x, y });
		}
	}
	return clickHandle;
}
