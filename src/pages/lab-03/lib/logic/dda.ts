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
			const roundX = Math.round(x);
			const roundY = Math.round(y);
			const roundNextX = Math.round(x + d.x);
			const roundNextY = Math.round(y + d.y);

			const newPoint: IPoint = Point.new(roundX, roundY);
			points.push(newPoint);

			if (roundNextX !== roundX && roundNextY !== roundY) {
				++steps;
			}

			x += d.x;
			y += d.y;
		}
	}

	return [points, steps];
}
