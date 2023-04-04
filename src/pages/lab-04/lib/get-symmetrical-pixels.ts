import { type IPosition, Pixel } from '../model';

export function getSymmetricPixels(pixels: Pixel[], center: IPosition): Pixel[] {
	const result: Pixel[] = [];
	for (const pixel of pixels) {
		const x = [pixel.x, -pixel.x + 2 * center.x, pixel.y - center.y + center.x, -pixel.y + center.y + center.x];
		const y = [pixel.y, -pixel.y + 2 * center.y, pixel.x - center.x + center.y, -pixel.x + center.x + center.y];

		result.push(
			new Pixel(x[0], y[0], pixel.color),
			new Pixel(x[1], y[0], pixel.color),
			new Pixel(x[0], y[1], pixel.color),
			new Pixel(x[1], y[1], pixel.color),

			new Pixel(x[2], y[2], pixel.color),
			new Pixel(x[3], y[2], pixel.color),
			new Pixel(x[2], y[3], pixel.color),
			new Pixel(x[3], y[3], pixel.color),
		);
	}
	return result;
}
