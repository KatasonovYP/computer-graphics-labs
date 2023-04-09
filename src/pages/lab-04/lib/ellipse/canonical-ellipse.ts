import { type Irgba } from 'shared/model';

import { type IPosition, Pixel } from '../../model';

export function canonicalEllipse(center: IPosition, radius: IPosition, color: Irgba): Pixel[] {
	const pixels: Pixel[] = [];

	const sqrRadiusX = radius.x * radius.x;
	const sqrRadiusY = radius.y * radius.y;

	const borderX = Math.round(center.x + radius.x / Math.sqrt(1 + sqrRadiusY / sqrRadiusX));
	const borderY = Math.round(center.y + radius.y / Math.sqrt(1 + sqrRadiusX / sqrRadiusY));

	for (let x = Math.round(center.x); x <= borderX; ++x) {
		const y = center.y + Math.sqrt(sqrRadiusX * sqrRadiusY - (x - center.x) ** 2 * sqrRadiusY) / radius.x;
		pixels.push(new Pixel(x, y, color));
	}

	for (let y = borderY; y >= Math.round(center.y); --y) {
		const x = center.x + Math.sqrt(sqrRadiusX * sqrRadiusY - (y - center.y) ** 2 * sqrRadiusX) / radius.y;
		pixels.push(new Pixel(x, y, color));
	}

	return pixels;
}
