import { type IPoint, IPosition, Irgba, Pixel } from 'shared/model';

import { drawLine } from './draw-line';

function getBorderBox(figure: IPoint[]): { minX: number; maxX: number; minY: number; maxY: number } {
	const gap = 10;
	const pointsX = figure.map((point) => point.x);
	const pointsY = figure.map((point) => point.y);
	const minX = Math.min(...pointsX) - gap;
	const maxX = Math.max(...pointsX) + gap;
	const minY = Math.min(...pointsY) - gap;
	const maxY = Math.max(...pointsY) + gap;
	return { minX, maxX, minY, maxY };
}

function invertLine(matrix: boolean[][], line: Pixel[]): void {
	for (let index = 0; index < line.length - 1; ++index) {
		if (index !== 0 && line[index].y === line[index - 1].y) continue;
		const current = line[index];
		for (let x = current.x; x < matrix[current.y].length; ++x) {
			matrix[current.y][x] = !matrix[current.y][x];
		}
	}
}

function convertMatrixToPixels(matrix: boolean[][], offset: IPosition, color: Irgba): Pixel[] {
	const pixels: Pixel[] = [];

	function getRow(element: boolean[], y: number): void {
		for (const [x, element_] of element.entries()) {
			if (element_) {
				pixels.push(new Pixel(x + offset.x, y + offset.y, color));
			}
		}
	}

	for (const [y, element] of matrix.entries()) {
		getRow(element, y);
	}
	return pixels;
}

export function fillFigure(figure: IPoint[], color: Irgba): Pixel[] {
	const { minX, maxX, minY, maxY } = getBorderBox(figure);
	const width = maxX - minX;
	const height = maxY - minY;
	const matrix: boolean[][] = Array.from({ length: height }).map(() => Array.from({ length: width }));
	console.log(width, height);
	for (let index = 0; index < figure.length - 1; ++index) {
		const start = {
			x: figure[index].x - minX,
			y: figure[index].y - minY,
		};
		const end = {
			x: figure[index + 1].x - minX,
			y: figure[index + 1].y - minY,
		};
		const line = drawLine(start, end);
		invertLine(matrix, line);
	}
	return convertMatrixToPixels(matrix, { x: minX, y: minY }, color);
}
