import { type Irgba , type IPosition, Pixel } from 'shared/model';

export function bresenhamEllipse(center: IPosition, radius: IPosition, color: Irgba): Pixel[] {
	const pixels: Pixel[] = [];
	let x = 0;
	let y = radius.y;

	const sqrRadiusX = radius.x ** 2;
	const sqrRadiusY = radius.y ** 2;
	let delta = sqrRadiusY - sqrRadiusX * (2 * radius.y + 1);

	while (y >= 0) {
		pixels.push(new Pixel(x + center.x, y + center.y, color));

		if (delta < 0) {
			const d1 = 2 * delta + sqrRadiusX * (2 * y + 2);

			if (d1 >= 0) {
				--y;
				delta += sqrRadiusX * (1 - 2 * y);
			}
			++x;
			delta += sqrRadiusY * (2 * x + 1);
		} else if (delta > 0) {
			const d2 = 2 * delta + sqrRadiusY * (2 - 2 * x);

			if (d2 <= 0) {
				++x;
				delta += sqrRadiusY * (2 * x + 1);
			}
			--y;
			delta += sqrRadiusX * (1 - 2 * y);
		} else {
			--y;
			++x;
			delta += sqrRadiusY * (2 * x + 1) + sqrRadiusX * (1 - 2 * y);
		}
	}
	return pixels;
}
