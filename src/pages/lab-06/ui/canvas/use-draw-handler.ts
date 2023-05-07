import { type MouseEvent, type RefObject } from 'react';

import { type IPosition } from 'shared/model';

import { useFiguresStore } from '../../store';

export function useDrawHandler(
	centerPosition: IPosition,
	canvasReference: RefObject<HTMLCanvasElement>,
): (event: MouseEvent<HTMLCanvasElement>) => void {
	const addPoint = useFiguresStore((state) => state.addPoint);

	function clickHandle(event: MouseEvent<HTMLCanvasElement>): void {
		const rect = canvasReference.current?.getBoundingClientRect();
		if (!rect) return;
		const x = Math.round(event.clientX - rect.left) - centerPosition.x;
		const y = Math.round(event.clientY - rect.top) - centerPosition.y;
		if (!event.ctrlKey && event.buttons) {
			addPoint({ x, y });
		}
	}
	return clickHandle;
}
