import { EDrawLineMethod, getDrawLineMethod } from 'shared/lib';

import { OOPoint } from 'shared/model';

interface ITimeFrame {
	method: EDrawLineMethod;
	time: number;
}

export function getAllMethodsTime(): ITimeFrame[] {
	return Object.values(EDrawLineMethod).map((method) => {
		return {
			method,
			time: getTimeData(method),
		};
	});
}

function getTimeData(method: EDrawLineMethod): number {
	const LAUNCHES_COUNT = 10_000;
	let sum = 0;

	const startPoint = OOPoint.new(0, 0);
	const endPoint = OOPoint.new(0, 100);

	for (let index = 0; index < LAUNCHES_COUNT; ++index) {
		const start = Date.now();
		getDrawLineMethod(method)(startPoint, endPoint);
		const end = Date.now();
		sum += end - start;
	}

	return sum / LAUNCHES_COUNT;
}
