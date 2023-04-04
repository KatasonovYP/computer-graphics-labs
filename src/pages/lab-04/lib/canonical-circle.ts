import { type Irgba } from 'shared/model';

import { type IPosition, Pixel } from '../model';

export function canonicalCircle(center: IPosition, radius: number, color: Irgba): Pixel[] {
	const pixels: Pixel[] = [];

	const border = Math.round(center.x + radius / Math.sqrt(2));

	for (let x = center.x; x <= border; ++x) {
		const y = center.y + Math.sqrt(radius ** 2 - (x - center.x) ** 2);
		pixels.push(new Pixel(x, y, color));
	}

	return pixels;
}
