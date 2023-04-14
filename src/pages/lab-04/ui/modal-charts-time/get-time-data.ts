import { EMethod } from '../../model';
import { getMethodCircle } from '../../lib';
import { DEFAULT_RGBA_COLOR } from 'shared/lib';

interface ITimeFrame {
	radius: number;
	canonical: number;
	parametric: number;
	bresenham: number;
	midpoint: number;
}

export function getAllMethodsTime(): ITimeFrame[] {
	const data: ITimeFrame[] = [];
	for (let radius = 50_000; radius < 500_000; radius += 50_000) {
		const dataFrame: ITimeFrame = {
			radius,
			canonical: getTimeData(EMethod.Canonical, radius),
			parametric: getTimeData(EMethod.Parametric, radius),
			bresenham: getTimeData(EMethod.Bresenham, radius),
			midpoint: getTimeData(EMethod.Midpoint, radius),
		};
		data.push(dataFrame);
	}
	console.log(data);
	return data;
}

function getTimeData(method: EMethod, radius: number): number {
	const LAUNCHES_COUNT = 2;
	let sum = 0;
	const getCirclePixels = getMethodCircle(method);
	const center = { x: 0, y: 0 };

	for (let index = 0; index < LAUNCHES_COUNT; ++index) {
		const start = Date.now();
		getCirclePixels(center, radius, DEFAULT_RGBA_COLOR);
		const end = Date.now();
		const time = end - start;
		sum += time;
	}
	return sum / LAUNCHES_COUNT;
}
