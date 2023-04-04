import { type Irgba } from 'shared/model';

import { HEIGHT, WIDTH } from 'shared/config';

import { type IPosition } from './position';

function isOnCanvas(pixel: Pixel, centerPosition: IPosition): boolean {
	return (
		pixel.x + centerPosition.x >= 0 &&
		pixel.x + centerPosition.x <= WIDTH &&
		pixel.y + centerPosition.y >= 0 &&
		pixel.y + centerPosition.y <= HEIGHT
	);
}

export class Pixel {
	x: number;
	y: number;
	color: Irgba;

	constructor(x: number, y: number, color: Irgba) {
		this.x = x;
		this.y = y;
		this.color = color;
	}

	draw(image: ImageData, centerPosition: IPosition): void {
		if (isOnCanvas(this, centerPosition)) {
			const roundedX = Math.round(centerPosition.x + this.x);
			const roundedY = Math.round(centerPosition.y + this.y);
			const index = 4 * (image.width * roundedY + roundedX);

			const data = image.data;
			data[index] = this.color.r;
			data[index + 1] = this.color.g;
			data[index + 3] = this.color.a;
			data[index + 2] = this.color.b;
		}
	}
}
