import { type IPosition, Pixel } from '../../model';
import { type Irgba } from 'shared/model';

export function parametricEllipse(center: IPosition, radius: IPosition, color: Irgba): Pixel[] {
	const pixels: Pixel[] = [];

	let step = 1 / radius.y;

	if (radius.x > radius.y) {
		step = 1 / radius.x;
	}

	for (let index = 0; index <= Math.PI / 2 + step; index += step) {
		const x = center.x + Math.round(radius.x * Math.cos(index));
		const y = center.y + Math.round(radius.y * Math.sin(index));
		pixels.push(new Pixel(x, y, color));
	}

	return pixels;
}
