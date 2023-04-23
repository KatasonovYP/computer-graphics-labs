import { type EDrawLineMethod, getDrawLineMethod, getLineSteps } from 'shared/lib';

import { OOPoint } from 'shared/model';

interface IStepsFrame {
	angle: number;
	steps: number;
}

export function getStepsData(method: EDrawLineMethod): IStepsFrame[] {
	const data: IStepsFrame[] = [];

	const startPoint = OOPoint.new(0, 0);
	const endPoint = OOPoint.new(0, 100);

	for (let angle = 0; angle <= 90; ++angle) {
		const current = endPoint.copy();
		current.rotate(startPoint, angle);

		const pixels = getDrawLineMethod(method)(startPoint, current);
		const steps = getLineSteps(pixels);

		data.push({ angle, steps });
	}
	return data;
}
