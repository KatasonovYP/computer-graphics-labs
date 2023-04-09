import { type Irgba } from 'shared/model';

import { type IPosition, Pixel } from '../model';

export function bresenhamCircle(center: IPosition, radius: number, color: Irgba): Pixel[] {
	const pixels: Pixel[] = [];
	let x = 0;
	let y = radius;

	let delta = 2 * (1 - radius);
	let d: number;

	while (y > x) {
		d = 2 * (delta + y) - 1;
		x += 1;

		if (d >= 0) {
			y -= 1;
			delta += 2 * (x - y + 1);
		} else {
			delta += x + x + 1;
		}
		pixels.push(new Pixel(x + center.x, y + center.y, color));
	}
	return pixels;
}
