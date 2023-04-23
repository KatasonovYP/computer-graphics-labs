import { type IOOPoint } from 'shared/model';

import { bresenhamInit } from './bresenham-init';

export function bresenhamSmooth(startPoint: IOOPoint, endPoint: IOOPoint): IOOPoint[] {
	const pixels: IOOPoint[] = [];

	if (startPoint.eq(endPoint)) {
		pixels.push(startPoint);
	} else {
		const { step, absDiff, isSwapped } = bresenhamInit(startPoint, endPoint);
		const intensity = 100;
		const tg = (absDiff.y / absDiff.x) * intensity;
		let error = intensity / 2;
		const threshold = intensity - tg;
		const current = startPoint.copy();

		while (!current.eq(endPoint)) {
			current.intensity = Math.round(error);
			pixels.push(current.copy());

			if (error < threshold) {
				isSwapped ? (current.y += step.y) : (current.x += step.x);
				error += tg;
			} else {
				current.x += step.x;
				current.y += step.y;
				error -= threshold;
			}
		}
	}

	return pixels;
}
