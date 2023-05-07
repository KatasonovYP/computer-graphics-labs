import { type Irgba, type IPosition, Pixel } from 'shared/model';

export function bresenhamCircle(center: IPosition, radius: number, color: Irgba): Pixel[] {
	const pixels: Pixel[] = [];
	let x = 0;
	let y = radius;

	let delta = 2 * (1 - radius);
	let d: number;

	while (y >= x) {
		pixels.push(new Pixel(x + center.x, y + center.y, color));

		d = 2 * (delta + y) - 1;
		++x;

		if (d >= 0) {
			--y;
			delta += 2 * (x - y + 1);
		} else {
			delta += 2 * x + 1;
		}
	}
	return pixels;
}
