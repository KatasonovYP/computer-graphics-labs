import { type EMethod, Point } from '../model';
import { getMethod, getSteps } from '../lib/logic';

interface IStepsFrame {
	angle: number;
	steps: number;
}

export function getStepsData(method: EMethod): IStepsFrame[] {
	const data: IStepsFrame[] = [];

	const startPoint = Point.new(0, 0);
	const endPoint = Point.new(0, 100);

	for (let angle = 0; angle <= 90; ++angle) {
		const current = endPoint.copy();
		current.rotate(startPoint, angle);

		const pixels = getMethod(method)(startPoint, current);
		const steps = getSteps(pixels);

		data.push({ angle, steps });
	}
	return data;
}
