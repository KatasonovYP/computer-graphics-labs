import { type IPoint } from '../../model';

export function getSteps(pixels: IPoint[]): number {
	let steps = 0;
	for (let index = 1; index < pixels.length; ++index) {
		const previous = pixels[index - 1];
		const current = pixels[index];
		if (previous.x !== current.x && previous.y !== current.y) {
			++steps;
		}
	}
	return steps;
}
