import { type IPoint, Point } from '../../model';

export function brezenhemInteger(a: IPoint, b: IPoint): [IPoint[], number] {
	const pixels: IPoint[] = [];
	let steps: number = 0;
	let exchange: number;

	if (a.eq(b)) {
		pixels.push(a);
	} else {
		let dx = b.x - a.x;
		let dy = b.y - a.y;

		const sx = Math.sign(dx);
		const sy = Math.sign(dy);

		dy = Math.abs(dy);
		dx = Math.abs(dx);

		if (dy > dx) {
			[dx, dy] = [dy, dx];
			exchange = 1;
		} else exchange = 0;

		let ehue = 2 * dy - dx; // TODO: understand
		let x = a.x;
		let y = a.y;

		let xb = x;
		let yb = y;
		steps = 0;

		while (x !== b.x || y !== b.y) {
			pixels.push(Point.new(x, y));

			if (ehue >= 0) {
				if (exchange === 1) {
					x += sx;
				} else {
					y += sy;
				}
				ehue -= 2 * dx;
			}
			if (ehue <= 0) {
				if (exchange === 0) {
					x += sx;
				} else {
					y += sy;
				}
				ehue += 2 * dy;
			}

			if (xb !== x && yb !== y) {
				steps += 1;
			}
			xb = x;
			yb = y;
		}
	}

	return [pixels, steps];
}
