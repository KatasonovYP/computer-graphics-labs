import { type IPoint } from '../../model';

import { bresenhamInit } from './bresenham-init';

export function bresenhamSmooth(startPoint: IPoint, endPoint: IPoint): [IPoint[], number] {
	const pixels: IPoint[] = [];
	let steps: number = 0;

	if (startPoint.eq(endPoint)) {
		pixels.push(startPoint);
	} else {
		const { step, absDiff, isSwapped } = bresenhamInit(startPoint, endPoint);

		const intensity = 100;
		const tg = (absDiff.y / absDiff.x) * intensity;
		let error = intensity / 2;
		const threshold = intensity - tg;

		const current = startPoint.copy();
		let last = startPoint.copy();

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

			if (!current.eq(last)) {
				++steps;
			}

			last = current.copy();
		}
	}

	return [pixels, steps];
}
