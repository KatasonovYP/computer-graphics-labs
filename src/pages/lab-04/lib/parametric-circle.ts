import { type IPosition, Pixel } from '../model';
import { type Irgba } from 'shared/model';

export function parametricCircle(center: IPosition, radius: number, color: Irgba): Pixel[] {
	const step = 1 / radius;
	const pixels: Pixel[] = [];
	for (let index = 0; index <= Math.PI / 4 + step; index += step) {
		const x = center.x + radius * Math.cos(index);
		const y = center.y + radius * Math.sin(index);
		pixels.push(new Pixel(x, y, color));
	}

	return pixels;
}
