import { type IOOPoint, type IPosition } from 'shared/model';

interface I2D extends IPosition {}

export function bresenhamInit(
	startPoint: IOOPoint,
	endPoint: IOOPoint,
): { step: I2D; absDiff: I2D; isSwapped: boolean } {
	const diff = {
		x: endPoint.x - startPoint.x,
		y: endPoint.y - startPoint.y,
	};
	const step = {
		x: Math.sign(diff.x),
		y: Math.sign(diff.y),
	};
	const absDiff = {
		x: Math.abs(diff.x),
		y: Math.abs(diff.y),
	};

	let isSwapped = false;
	if (absDiff.x < absDiff.y) {
		[absDiff.x, absDiff.y] = [absDiff.y, absDiff.x];
		isSwapped = true;
	}
	return { step, absDiff, isSwapped };
}
