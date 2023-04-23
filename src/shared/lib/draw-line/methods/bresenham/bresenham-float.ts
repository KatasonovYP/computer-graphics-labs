import { type IOOPoint } from 'shared/model';

import { bresenhamInit } from './bresenham-init';

export function bresenhamFloat(startPoint: IOOPoint, endPoint: IOOPoint): IOOPoint[] {
	const pixels: IOOPoint[] = [];

	if (startPoint.eq(endPoint)) {
		pixels.push(startPoint);
	} else {
		const { step, absDiff, isSwapped } = bresenhamInit(startPoint, endPoint);
		const tg = absDiff.y / absDiff.x;
		let error = tg - 0.5;
		const current = startPoint.copy();

		while (!current.eq(endPoint)) {
			pixels.push(current.copy());

			if (error >= 0) {
				isSwapped ? (current.x += step.x) : (current.y += step.y);
				error -= 1;
			}
			if (error <= 0) {
				isSwapped ? (current.y += step.y) : (current.x += step.x);
				error += tg;
			}
		}
	}

	return pixels;
}
