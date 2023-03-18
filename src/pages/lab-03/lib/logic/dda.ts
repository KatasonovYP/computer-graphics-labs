import { type IPoint, Point } from '../../model';

export function dda(a: IPoint, b: IPoint): [IPoint[], number] {
	const points: IPoint[] = [];
	let steps = 0;

	if (a.eq(b)) {
		points.push(a);
	} else {
		let d = {
			x: Math.abs(a.x - b.x),
			y: Math.abs(a.y - b.y),
		};

		const length: number = Math.max(d.x, d.y);

		d = {
			x: Math.abs(a.x - b.x) / length,
			y: Math.abs(a.y - b.y) / length,
		};

		let x = a.x;
		let y = a.y;

		for (let index = 0; index < length + 1; ++index) {
			const newPoint: IPoint = Object.create(Point).init(Math.round(x), Math.round(y));
			points.push(newPoint);

			if (Math.round(x + d.x) !== Math.round(x) && Math.round(y + d.y) !== Math.round(y)) {
				++steps;
			}

			x += d.x;
			y += d.y;
		}
	}

	return [points, steps];
}
