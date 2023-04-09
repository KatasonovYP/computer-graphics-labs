import { type RefObject, useEffect, useRef, type WheelEvent } from 'react';

import { drawPixels } from '../draw-pixels';
import { drawGridTools } from '../draw-grid-tools';

import { type Pixel } from '../../../model';

import { type moveCanvasHandlerType, useMoveCanvas } from './use-move-canvas';
import { useScaleCanvas } from './use-scale-canvas';

export type scaleCanvasHandlerType = (event: WheelEvent<HTMLCanvasElement>) => void;

function cleanCanvas(context: CanvasRenderingContext2D): void {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

export function useCanvas(pixels: Pixel[]): {
	canvasReference: RefObject<HTMLCanvasElement>;
	moveCanvas: moveCanvasHandlerType;
	scaleCanvas: scaleCanvasHandlerType;
} {
	const canvasReference = useRef<HTMLCanvasElement>(null);
	const [centerPosition, moveCanvas] = useMoveCanvas();
	const [scale, scaleCanvas] = useScaleCanvas();

	useEffect(() => {
		const canvas = canvasReference.current;
		if (!canvas) return;
		const context = canvas?.getContext('2d');
		if (context) {
			cleanCanvas(context);
			drawPixels(context, pixels, centerPosition);
			drawGridTools(context, centerPosition);

			// const imageData = context.getImageData(0, 0, context.canvas.width / scale, context.canvas.height / scale);
			// context.putImageData(imageData, 0, 0);
			//
			// context.scale(scale, scale);
			//
			// context.imageSmoothingEnabled = false;
			// context.drawImage(context.canvas, 0, 0);
			//
			// context.scale(1 / scale, 1 / scale);
		}
	}, [centerPosition, scale, pixels]);
	return { canvasReference, moveCanvas, scaleCanvas };
}
