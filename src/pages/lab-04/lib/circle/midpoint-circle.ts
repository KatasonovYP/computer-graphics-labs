import { type Irgba } from 'shared/model';

import { type IPosition, Pixel } from '../../model';

export function midpointCircle(center: IPosition, radius: number, color: Irgba): Pixel[] {
	const pixels: Pixel[] = [];
	let x = radius;
	let y = 0;

	let delta = 1 - radius; // 5/4 - radius

	while (x >= y) {
		pixels.push(new Pixel(x + center.x, y + center.y, color));

		if (delta >= 0) {
			--x;
			delta -= 2 * x;
		}

		++y;
		delta += 2 * y + 1;
	}
	return pixels;
}
