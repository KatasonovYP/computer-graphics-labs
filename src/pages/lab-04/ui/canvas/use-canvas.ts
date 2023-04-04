import { type RefObject, useEffect, useRef } from 'react';

import { useCanvasStore } from '../../store';

import { drawFigures } from './draw-figures';
import { drawGrid } from './draw-grid';

function cleanCanvas(context: CanvasRenderingContext2D): void {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
export function useCanvas(): RefObject<HTMLCanvasElement> {
	const canvasReference = useRef<HTMLCanvasElement>(null);
	const centerPosition = useCanvasStore((state) => state.centerPosition);
	const figures = useCanvasStore((state) => state.figures);

	useEffect(() => {
		const context = canvasReference.current?.getContext('2d');

		if (context) {
			cleanCanvas(context);
			drawFigures(context, centerPosition, figures);
			drawGrid(context, centerPosition);
		}
	}, [centerPosition, figures]);
	return canvasReference;
}
