import { type IPosition, type Pixel } from '../../model';

export function drawPixels(context: CanvasRenderingContext2D, pixels: Pixel[], centerPosition: IPosition): void {
	const image = context.createImageData(context.canvas.width, context.canvas.height);
	image.data.fill(255);

	for (const pixel of pixels) {
		pixel.draw(image, centerPosition);
	}
	context.putImageData(image, 0, 0);
}
