import { EMethod, Point } from '../../model';
import { getMethod } from '../../lib/logic';

interface ITimeFrame {
	method: EMethod;
	time: number;
}

export function getAllMethodsTime(): ITimeFrame[] {
	return Object.values(EMethod).map((method) => {
		return {
			method,
			time: getTimeData(method),
		};
	});
}

function getTimeData(method: EMethod): number {
	const LAUNCHES_COUNT = 10_000;
	let sum = 0;

	const startPoint = Point.new(0, 0);
	const endPoint = Point.new(0, 100);

	for (let index = 0; index < LAUNCHES_COUNT; ++index) {
		const start = Date.now();
		getMethod(method)(startPoint, endPoint);
		const end = Date.now();
		sum += end - start;
	}

	return sum / LAUNCHES_COUNT;
}
