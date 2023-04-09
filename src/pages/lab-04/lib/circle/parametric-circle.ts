import { type Irgba } from 'shared/model';

import { type IPosition, Pixel } from '../../model';

export function parametricCircle(center: IPosition, radius: number, color: Irgba): Pixel[] {
	const pixels: Pixel[] = [];

	const step = 1 / radius;

	for (let index = 0; index <= Math.PI / 4 + step; index += step) {
		const x = center.x + radius * Math.cos(index);
		const y = center.y + radius * Math.sin(index);
		pixels.push(new Pixel(x, y, color));
	}

	return pixels;
}
