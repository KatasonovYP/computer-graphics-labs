import { type IPoint, IPosition, Irgba, Pixel } from 'shared/model';

import { drawLine } from './draw-line';

function getBorderBox(figure: IPoint[]): { minX: number; maxX: number; minY: number; maxY: number } {
	const gap = 2;
	const pointsX = figure.map((point) => point.x);
	const pointsY = figure.map((point) => point.y);
	const minX = Math.min(...pointsX) - gap;
	const maxX = Math.max(...pointsX) + gap;
	const minY = Math.min(...pointsY) - gap;
	const maxY = Math.max(...pointsY) + gap;
	return { minX, maxX, minY, maxY };
}

function removeDuplicates(pixels: Pixel[]): Pixel[] {
	const filtered: Pixel[] = [];
	for (const pixel of pixels) {
		if (!filtered.some((element) => element.y === pixel.y)) {
			filtered.push(pixel);
		}
	}
	return filtered;
}

function findIntersect(startPoint: Pixel, figure: IPoint[]): number {
	const edges: Array<[IPoint, IPoint]> = [];
	for (let i = 0; i < figure.length - 1; ++i) {
		edges.push([figure[i], figure[i + 1]]);
	}
	let minimal = 100_000;
	for (const edge of edges) {
		if (edge[0].y > edge[1].y) {
			[edge[0], edge[1]] = [edge[1], edge[0]];
		}
		minimal = Math.min(minimal, getIntersectionPoint(edge[0], edge[1], startPoint.y));
	}
	return minimal;
}

function invertLine(matrix: boolean[][], line: Pixel[], figure: IPoint[]): void {
	const filtered = removeDuplicates(line);
	// filtered = filtered.sort((a, b) => a.x - b.x);
	for (let index = 0; index < filtered.length; ++index) {
		const current = filtered[index];
		const end = findIntersect(current, figure);
		for (let x = current.x; x < matrix[current.y].length; ++x) {
			matrix[current.y][x] = !matrix[current.y][x];
		}
	}
	let current = filtered[filtered.length - 1];
	for (let x = current.x; x < matrix[current.y].length; ++x) {
		matrix[current.y][x] = !matrix[current.y][x];
	}
	current = filtered[0];
	for (let x = current.x; x < matrix[current.y].length; ++x) {
		matrix[current.y][x] = !matrix[current.y][x];
	}
}

function convertMatrixToPixels(matrix: boolean[][], offset: IPosition, color: Irgba): Pixel[][] {
	const pixels: Pixel[][] = [];

	function getRow(element: boolean[], y: number): void {
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

export function fillFigure(figure: IPoint[], color: Irgba): Pixel[][] {
	const { minX, maxX, minY, maxY } = getBorderBox(figure);
	const width = maxX - minX;
	const height = maxY - minY;
	const matrix: boolean[][] = Array.from({ length: height }).map(() => Array.from({ length: width }));
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
		invertLine(matrix, line, figure);
	}
	return convertMatrixToPixels(matrix, { x: minX, y: minY }, color);
}

export function fillWithoutPixels(figure: IPoint[], color: Irgba): Pixel[][] {
	const maxPoint = Math.max(...figure.map((point) => point.x));
	const edges: Array<[IPoint, IPoint]> = [];
	for (let i = 0; i < figure.length - 1; ++i) {
		edges.push([figure[i], figure[i + 1]]);
	}
	const allPoints: Pixel[][] = [];
	for (const edge of edges) {
		const pointForEdge: Pixel[] = [];
		if (edge[0].y > edge[1].y) {
			[edge[0], edge[1]] = [edge[1], edge[0]];
		}
		let y = edge[0].y + 0.5;

		while (y < edge[1].y) {
			let x = getIntersectionPoint(edge[0], edge[1], y);

			if (Math.floor(x) + 0.5 > x + 10) {
				pointForEdge.push(new Pixel(Math.floor(x), Math.floor(y), color));
			}
			x = Math.floor(x);
			++x;

			while (x <= maxPoint) {
				pointForEdge.push(new Pixel(x, Math.floor(y), color));
				++x;
			}

			++y;
		}
		allPoints.push(pointForEdge);
	}
	return allPoints;
}

function getIntersectionPoint(start: IPoint, end: IPoint, y: number): number {
	return ((y - start.y) * (end.x - start.x)) / (end.y - start.y) + start.x;
}
