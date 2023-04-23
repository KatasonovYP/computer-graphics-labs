import { type IPoint, Pixel } from 'shared/model';

export function drawLine(startPoint: IPoint, endPoint: IPoint): Pixel[] {
	const pixels: Pixel[] = [];

	if (startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
		pixels.push(new Pixel(startPoint.x, startPoint.y));
	} else {
		const absDiff = {
			x: Math.abs(endPoint.x - startPoint.x),
			y: Math.abs(endPoint.y - startPoint.y),
		};

		const length: number = Math.max(absDiff.x, absDiff.y);

		const step = {
			x: (endPoint.x - startPoint.x) / length,
			y: (endPoint.y - startPoint.y) / length,
		};

		let x = startPoint.x;
		let y = startPoint.y;

		for (let index = 0; index <= length; ++index) {
			const roundX = Math.round(x);
			const roundY = Math.round(y);

			pixels.push(new Pixel(roundX, roundY));

			x += step.x;
			y += step.y;
		}
	}

	return pixels;
}
