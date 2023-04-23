import { type Irgba , type IPosition, Pixel } from 'shared/model';

export function midpointEllipse(center: IPosition, radius: IPosition, color: Irgba): Pixel[] {
	const pixels: Pixel[] = [];

	const sqrRadiusX = radius.x * radius.x;
	const sqrRadiusY = radius.y * radius.y;

	let x = 0;
	let y = radius.y;

	let border = Math.round(radius.x / Math.sqrt(1 + sqrRadiusY / sqrRadiusX));
	let delta = sqrRadiusY - Math.round(sqrRadiusX * (radius.y - 1 / 4));

	while (x <= border) {
		pixels.push(new Pixel(x + center.x, y + center.y, color));

		if (delta >= 0) {
			--y;
			delta -= 2 * sqrRadiusX * y;
		}
		++x;
		delta += 2 * sqrRadiusY * x + 1;
	}

	x = radius.x;
	y = 0;

	border = Math.round(radius.y / Math.sqrt(1 + sqrRadiusX / sqrRadiusY));
	delta = sqrRadiusX - Math.round(sqrRadiusY * (radius.x - 1 / 4));

	while (y <= border) {
		pixels.push(new Pixel(x + center.x, y + center.y, color));

		if (delta >= 0) {
			--x;
			delta -= 2 * sqrRadiusY * x;
		}
		++y;
		delta += 2 * sqrRadiusX * y + 1;
	}

	return pixels;
}
