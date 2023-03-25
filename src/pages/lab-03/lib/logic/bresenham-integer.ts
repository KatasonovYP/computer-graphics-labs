import { type IPoint } from '../../model';

import { bresenhamInit } from './bresenham-init';

export function bresenhamInteger(startPoint: IPoint, endPoint: IPoint): [IPoint[], number] {
	const pixels: IPoint[] = [];
	let steps: number = 0;

	if (startPoint.eq(endPoint)) {
		pixels.push(startPoint);
	} else {
		const { step, absDiff, isSwapped } = bresenhamInit(startPoint, endPoint);

		let error = 2 * absDiff.y - absDiff.x;
		const current = startPoint.copy();
		let last = startPoint.copy();

		while (!current.eq(endPoint)) {
			pixels.push(current.copy());

			if (error >= 0) {
				isSwapped ? (current.x += step.x) : (current.y += step.y);
				error -= 2 * absDiff.x;
			}
			if (error <= 0) {
				isSwapped ? (current.y += step.y) : (current.x += step.x);
				error += 2 * absDiff.y;
			}

			if (!current.eq(last)) {
				++steps;
			}

			last = current.copy();
		}
	}
	return [pixels, steps];
}
