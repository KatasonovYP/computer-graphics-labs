import { type RefObject, useEffect, useRef } from 'react';

import { drawPixels } from '../draw-pixels';
import { drawGrid } from '../draw-grid';

import { type Pixel } from '../../../model';

import { type moveCanvasHandlerType, useMoveCanvas } from './use-move-canvas';

function cleanCanvas(context: CanvasRenderingContext2D): void {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

export function useCanvas(pixels: Pixel[]): [RefObject<HTMLCanvasElement>, moveCanvasHandlerType] {
	const canvasReference = useRef<HTMLCanvasElement>(null);
	const [centerPosition, moveCanvas] = useMoveCanvas();

	useEffect(() => {
		const context = canvasReference.current?.getContext('2d');
		if (context) {
			cleanCanvas(context);
			drawPixels(context, pixels, centerPosition);
			drawGrid(context, centerPosition);
		}
	}, [centerPosition, pixels]);
	return [canvasReference, moveCanvas];
}
