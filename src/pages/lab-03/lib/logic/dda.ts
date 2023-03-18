import { type IPoint, Point } from '../../model';

export function dda(a: IPoint, b: IPoint): [IPoint[], number] {
	const points: IPoint[] = [];
	let steps = 0;

	if (a.eq(b)) {
		points.push(a);
	} else {
		let d = {
			x: Math.abs(b.x - a.x),
			y: Math.abs(b.y - a.y),
		};

		const length: number = Math.max(d.x, d.y);

		d = {
			x: (b.x - a.x) / length,
			y: (b.y - a.y) / length,
		};

		let x = a.x;
		let y = a.y;

		for (let index = 0; index <= length; ++index) {
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
