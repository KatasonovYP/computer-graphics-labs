import { type MouseEvent, type RefObject } from 'react';

import { type IPosition } from 'shared/model';

import { useFiguresStore } from '../../store';

export function useClickHandle(
	centerPosition: IPosition,
	canvasReference: RefObject<HTMLCanvasElement>,
): (event: MouseEvent<HTMLCanvasElement>) => void {
	const addPoint = useFiguresStore((state) => state.addPoint);
	const closeFigure = useFiguresStore((state) => state.closeFigure);

	function clickHandle(event: MouseEvent<HTMLCanvasElement>): void {
		if (event.altKey) {
			closeFigure();
		} else if (!event.ctrlKey) {
			const rect = canvasReference.current?.getBoundingClientRect();
			if (!rect) return;
			const x = Math.round(event.clientX - rect.left) - centerPosition.x;
			const y = Math.round(event.clientY - rect.top) - centerPosition.y;
			addPoint({ x, y });
		}
	}
	return clickHandle;
}
