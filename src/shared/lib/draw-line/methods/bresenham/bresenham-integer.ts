import { type IOOPoint } from 'shared/model';

import { bresenhamInit } from './bresenham-init';

export function bresenhamInteger(startPoint: IOOPoint, endPoint: IOOPoint): IOOPoint[] {
	const pixels: IOOPoint[] = [];

	if (startPoint.eq(endPoint)) {
		pixels.push(startPoint);
	} else {
		const { step, absDiff, isSwapped } = bresenhamInit(startPoint, endPoint);
		let error = 2 * absDiff.y - absDiff.x;
		const current = startPoint.copy();

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
		}
	}
	return pixels;
}
