import { type IPoint, Point } from '../../model';

export function wu(startPoint: IPoint, endPoint: IPoint): [IPoint[], number] {
	const pixels: IPoint[] = [];
	const steps: number = 10;

	function drawPoint(steep: boolean, x: number, y: number, intensity: number): void {
		if (steep) {
			[x, y] = [y, x];
		}

		const point = Point.new(x, y);
		point.intensity = intensity * 100;
		pixels.push(point);
	}

	let [x0, y0] = [startPoint.x, startPoint.y];
	let [x1, y1] = [endPoint.x, endPoint.y];

	const steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
	if (steep) {
		[x0, y0] = [y0, x0];
		[x1, y1] = [y1, x1];
	}
	if (x0 > x1) {
		[x0, x1] = [x1, x0];
		[y0, y1] = [y1, y0];
	}

	drawPoint(steep, x0, y0, 1);
	drawPoint(steep, x1, y1, 1);
	const dx = x1 - x0;
	const dy = y1 - y0;
	const gradient = dy / dx;
	let y = y0 + gradient;

	for (let x = x0 + 1; x <= x1 - 1; x++) {
		drawPoint(steep, x, Math.floor(y), 1 - (y - Math.floor(y)));
		drawPoint(steep, x, Math.floor(y) + 1, y - Math.floor(y));
		y += gradient;
	}

	return [pixels, steps];
}
