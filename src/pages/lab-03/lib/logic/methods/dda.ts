import { type IPoint, Point } from '../../../model';

export function dda(startPoint: IPoint, endPoint: IPoint): IPoint[] {
	const points: IPoint[] = [];

	if (startPoint.eq(endPoint)) {
		points.push(startPoint);
	} else {
		const absDiff = {
			x: Math.abs(endPoint.x - startPoint.x),
			y: Math.abs(endPoint.y - startPoint.y),
		};

		const length: number = Math.max(absDiff.x, absDiff.y);

		const step = {
			x: (endPoint.x - startPoint.x) / length,
			y: (endPoint.y - startPoint.y) / length,
		};

		let x = startPoint.x;
		let y = startPoint.y;

		for (let index = 0; index <= length; ++index) {
			const roundX = Math.round(x);
			const roundY = Math.round(y);

			points.push(Point.new(roundX, roundY));

			x += step.x;
			y += step.y;
		}
	}

	return points;
}
