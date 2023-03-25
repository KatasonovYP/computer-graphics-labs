import { type IPoint } from '../../model';

export function brezenhemFloat(startPoint: IPoint, endPoint: IPoint): [IPoint[], number] {
	const pixels: IPoint[] = [];
	let steps: number = 0;

	if (startPoint.eq(endPoint)) {
		pixels.push(startPoint);
	} else {
		let isSwapped: boolean;

		const diff = {
			x: endPoint.x - startPoint.x,
			y: endPoint.y - startPoint.y,
		};

		const step = {
			x: Math.sign(diff.x),
			y: Math.sign(diff.y),
		};

		const absDiff = {
			y: Math.abs(diff.y),
			x: Math.abs(diff.x),
		};

		if (absDiff.x < absDiff.y) {
			[absDiff.x, absDiff.y] = [absDiff.y, absDiff.x];
			isSwapped = true;
		} else {
			isSwapped = false;
		}

		const tg = absDiff.y / absDiff.x;
		let error = tg - 0.5;
		const current = startPoint.copy();
		let last = current.copy();
		steps = 0;

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

			if (!current.eq(last)) {
				steps += 1;
			}

			last = current.copy();
		}
	}

	return [pixels, steps];
}
