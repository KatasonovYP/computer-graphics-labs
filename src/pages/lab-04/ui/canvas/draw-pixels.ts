import { HEIGHT, WIDTH } from 'shared/config';

import { type IPosition, type Pixel } from '../../model';

export function drawPixels(context: CanvasRenderingContext2D, pixels: Pixel[], centerPosition: IPosition): void {
	const image = context.createImageData(WIDTH, HEIGHT);

	for (const pixel of pixels) {
		pixel.draw(image, centerPosition);
	}
	context.putImageData(image, 0, 0);
}
