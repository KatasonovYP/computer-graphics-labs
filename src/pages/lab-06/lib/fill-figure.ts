import { type IPosition, type Irgba, Pixel } from 'shared/model';

function getBorderBox(figure: Pixel[]): { minX: number; maxX: number; minY: number; maxY: number } {
	const pointsX = figure.map((point) => point.x);
	const pointsY = figure.map((point) => point.y);
	const minX = Math.min(...pointsX);
	const maxX = Math.max(...pointsX) + 1;
	const minY = Math.min(...pointsY);
	const maxY = Math.max(...pointsY) + 1;
	return { minX, maxX, minY, maxY };
}

function convertMatrixToPixels(matrix: number[][], offset: IPosition, color: Irgba): Pixel[][] {
	const pixels: Pixel[][] = [];

	function getRow(element: number[], y: number): void {
		const linePixels: Pixel[] = [];
		for (const [x, element_] of element.entries()) {
			if (element_) {
				linePixels.push(new Pixel(x + offset.x, y + offset.y, color));
			}
		}
		pixels.push(linePixels);
	}

	for (const [y, element] of matrix.entries()) {
		getRow(element, y);
	}
	return pixels;
}

function createMatrix(figure: Pixel[], min: IPosition, size: IPosition): number[][] {
	const matrix: number[][] = [];
	for (let y = 0; y < size.y; ++y) {
		const zeroRow = Array.from({ length: size.x }).fill(0);
		matrix.push(zeroRow as number[]);
	}
	for (const pixel of figure) {
		matrix[pixel.y - min.y][pixel.x - min.x] = 1;
	}
	return matrix;
}

export function fillFigure(figure: Pixel[], seed: Pixel, color: Irgba): Pixel[][] {
	const { minX, maxX, minY, maxY } = getBorderBox(figure);
	const width = maxX - minX;
	const height = maxY - minY;
	const matrix = createMatrix(figure, { x: minX, y: minY }, { x: width, y: height });

	const stack: Pixel[] = [seed];
	let leftX: number = 0;
	let rightX: number = 0;

	while (stack.length > 0) {
		const current = stack.pop() as Pixel;

		// Правые пиксели
		let x = current.x;
		let y = current.y;

		for (; !matrix[y - minY][x - minX] && x - minX < matrix[0].length; ++x) {
			matrix[y - minY][x - minX] = 2;
			rightX = x;
		}

		// Левые пиксели
		x = current.x - 1;
		y = current.y;
		for (; !matrix[y - minY][x - minX] && x - minX >= 0; --x) {
			matrix[y - minY][x - minX] = 2;
			leftX = x;
		}

		// нижняя часть
		if (current.y - minY < matrix.length - 1) {
			x = leftX;
			y = current.y + 1;
			while (x <= rightX - 1) {
				let flag = false;
				while (!matrix[y - minY][x - minX] && x <= rightX - 1) {
					flag = true;
					++x;
				}
				// ########################
				if (flag && y - minY < matrix.length) {
					const isSomething = x === rightX + 1 && matrix[y - minY][x - minX];
					const nextPixel = new Pixel(isSomething ? x : x - 1, y);
					stack.push(nextPixel);
				}
				const xIn = x;
				while (!matrix[y - minY][x - minX] && x < rightX) ++x;
				if (xIn === x) ++x;
				// ########################
			}
		}

		// верхняя часть
		x = leftX;
		y = current.y - 1;
		while (x <= rightX - 1) {
			let flag = false;
			while (!matrix[y - minY][x - minX] && x <= rightX - 1) {
				flag = true;
				++x;
			}
			// ########################
			if (flag && y - minY > 0) {
				const isSomething = x === rightX + 1 && matrix[y - minY][x - minX];
				const nextPixel = new Pixel(isSomething ? x : x - 1, y);
				stack.push(nextPixel);
			}
			const xIn = x;
			while (!matrix[y - minY][x - minX] && x < rightX) ++x;
			if (xIn === x) ++x;
			// ########################
		}
	}
	return convertMatrixToPixels(matrix, { x: minX, y: minY }, color);
}
