import { HEIGHT, WIDTH } from 'shared/config';

import { type IPosition, type Pixel } from '../../model';

function drawFigure(image: ImageData, centerPosition: IPosition, figure: Pixel[]): void {
	for (const pixel of figure) {
		pixel.draw(image, centerPosition);
	}
}

export function drawFigures(context: CanvasRenderingContext2D, centerPosition: IPosition, figures: Pixel[][]): void {
	const image = context.createImageData(WIDTH, HEIGHT);

	for (const figure of figures) {
		drawFigure(image, centerPosition, figure);
	}
	context.putImageData(image, 0, 0);
}
