import { type IPosition, Pixel } from '../model';

type reflectFunction = (x: number, y: number, center: IPosition) => IPosition;

export function getReflectedCirclePixels(targetPixels: Pixel[], center: IPosition): Pixel[] {
	let resultPixels: Pixel[] = [...targetPixels];
	for (const reflect of [reflectVertically, reflectHorizontally, reflectDiagonally]) {
		resultPixels = reflectForAllPixels(reflect, resultPixels, center);
	}
	return resultPixels;
}

export function getReflectedEllipsePixels(targetPixels: Pixel[], center: IPosition): Pixel[] {
	let resultPixels: Pixel[] = [...targetPixels];
	for (const reflect of [reflectVertically, reflectHorizontally]) {
		resultPixels = reflectForAllPixels(reflect, resultPixels, center);
	}
	return resultPixels;
}

function reflectForAllPixels(reflect: reflectFunction, targetPixels: Pixel[], center: IPosition): Pixel[] {
	const resultPixels: Pixel[] = [...targetPixels];
	for (const pixel of targetPixels) {
		const { x, y } = reflect(pixel.x, pixel.y, center);
		const reflected = new Pixel(x, y, pixel.color);
		resultPixels.push(reflected);
	}
	return resultPixels;
}

const reflectVertically: reflectFunction = (x: number, y: number, center: IPosition): IPosition => {
	return {
		x: -x + 2 * center.x,
		y,
	};
};

const reflectHorizontally: reflectFunction = (x: number, y: number, center: IPosition): IPosition => {
	return {
		x,
		y: -y + 2 * center.y,
	};
};

const reflectDiagonally: reflectFunction = (x: number, y: number, center: IPosition): IPosition => {
	return {
		x: y - center.y + center.x,
		y: -x + center.x + center.y,
	};
};
