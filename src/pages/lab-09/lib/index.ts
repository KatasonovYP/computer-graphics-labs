import { type IFlatPoint, type IPolygon } from '../model';

type IVector = IFlatPoint;
// type IMatrix = [IFlatPoint, IFlatPoint];

// function scalarProduct(vectorA: IVector, vectorB: IVector): number {
// 	return vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1];
// }
//
// function matrixInvert(matrix: IMatrix): IMatrix {
// 	const det: number = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
// 	return [
// 		[+matrix[1][1] / det, -matrix[0][1] / det],
// 		[-matrix[1][0] / det, +matrix[0][0] / det],
// 	];
// }
//
// function matrixProduct(matrixA: IMatrix, matrixB: IMatrix): IMatrix {
// 	return [
// 		[
// 			matrixA[0][0] * matrixB[0][0] + matrixA[0][1] * matrixB[1][0],
// 			matrixA[0][0] * matrixB[0][1] + matrixA[0][1] * matrixB[1][1],
// 		],
// 		[
// 			matrixA[1][0] * matrixB[0][0] + matrixA[1][1] * matrixB[1][0],
// 			matrixA[1][0] * matrixB[0][1] + matrixA[1][1] * matrixB[1][1],
// 		],
// 	];
// }

function getVector(dotStart: IFlatPoint, dotEnd: IFlatPoint): IVector {
	return [dotEnd[0] - dotStart[0], dotEnd[1] - dotStart[1]];
}

function crossProduct(vectorA: IVector, vectorB: IVector): number {
	return vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0];
}

export function getConvexityPolygon(cutter: IPolygon): -1 | 0 | 1 {
	if (cutter.length < 3) {
		return 0;
	}

	const vector1 = getVector(cutter[0], cutter[1]);
	const vector2 = getVector(cutter[1], cutter[2]);

	const sign = crossProduct(vector1, vector2) > 0 ? 1 : -1;

	for (let index = 0; index < cutter.length; index++) {
		const vectorI: IVector = getVector(
			cutter[(index - 2 + cutter.length) % cutter.length],
			cutter[(index - 1 + cutter.length) % cutter.length],
		);
		const vectorJ: IVector = getVector(cutter[(index - 1 + cutter.length) % cutter.length], cutter[index]);

		if (sign * crossProduct(vectorI, vectorJ) < 0) {
			return 0;
		}
	}

	if (sign < 0) {
		return -1;
	}

	return 1;
}

// function visibility(point: number[], begin: number[], end: number[]): number {
// 	const tmp1: number = (point[0] - begin[0]) * (end[1] - begin[1]);
// 	const tmp2: number = (point[1] - begin[1]) * (end[0] - begin[0]);
// 	let res: number = tmp1 - tmp2;
//
// 	if (res > -1e-7 && res < 1e-7) {
// 		res = 0;
// 	}
//
// 	return Math.sign(res);
// }
//
// function checkLinesCrossing(begin1: number[], end1: number[], begin2: number[], end2: number[]): boolean {
// 	const vis1: number = visibility(begin1, begin2, end2);
// 	const vis2: number = visibility(end1, begin2, end2);
//
// 	return (vis1 < 0 && vis2 > 0) || (vis1 > 0 && vis2 < 0);
// }
//
// function getCrossPoint(begin1: IFlatPoint, end1: IFlatPoint, begin2: IFlatPoint, end2: IFlatPoint): IFlatPoint {
// 	const difference: IMatrix = [
// 		[end1[0] - begin1[0], begin2[0] - end2[0]],
// 		[end1[1] - begin1[1], begin2[1] - end2[1]],
// 	];
//
// 	const rights: IMatrix = [
// 		[0, begin2[0] - begin1[0]],
// 		[0, begin2[1] - begin1[1]],
// 	];
//
// 	const inverted: IMatrix = matrixInvert(difference);
// 	const parameter: IMatrix = matrixProduct(inverted, rights);
//
// 	const x: number = begin1[0] + (end1[0] - begin1[0]) * parameter[0][0];
// 	const y: number = begin1[1] + (end1[1] - begin1[1]) * parameter[1][0];
//
// 	return [x, y];
// }

function visibility(p1: IFlatPoint, p2: IFlatPoint, p3: IFlatPoint): number {
	const v12: IVector = getVector(p1, p2);
	const v13: IVector = getVector(p1, p3);
	const cross: number = crossProduct(v12, v13);

	if (Math.abs(cross) < 1e-6) {
		return 0;
	}
	return cross < 0 ? -1 : 1;
}

function isVisible(p1: IFlatPoint, p2: IFlatPoint, p3: IFlatPoint): boolean {
	return visibility(p1, p2, p3) >= 0;
}

function linesIntersect(s1: IFlatPoint, e1: IFlatPoint, s2: IFlatPoint, e2: IFlatPoint): boolean {
	return visibility(s1, e1, s2) * visibility(s1, e1, e2) < 0;
}

function intersectionPoint(p1: IFlatPoint, p2: IFlatPoint, w1: IFlatPoint, w2: IFlatPoint): IFlatPoint {
	const a11 = p2[0] - p1[0];
	const a12 = w1[0] - w2[0];
	const a21 = p2[1] - p1[1];
	const a22 = w1[1] - w2[1];

	const r1 = w1[0] - p1[0];
	const r2 = w1[1] - p1[1];

	const d = a11 * a22 - a12 * a21;
	const A11 = a22 / d;
	const A12 = -a12 / d;

	const t = A11 * r1 + A12 * r2;

	const x = p1[0] + (p2[0] - p1[0]) * t;
	const y = p1[1] + (p2[1] - p1[1]) * t;

	return [x, y];
}

function edgeClipPolygon(e1: IFlatPoint, e2: IFlatPoint, polygon: IFlatPoint[]): IFlatPoint[] {
	const q: IFlatPoint[] = [];
	for (let j = 1; j < polygon.length + 1; j++) {
		const curr = polygon[j % polygon.length];
		if (linesIntersect(e1, e2, polygon[j - 1], curr)) {
			q.push(intersectionPoint(e1, e2, polygon[j - 1], curr));
		}
		if (isVisible(e1, e2, curr)) {
			q.push(curr);
		}
	}

	return q;
}

export function sutherlandHodgman(clipperNodes: IPolygon, polygonNodes: IPolygon): IPolygon {
	let polygon: IPolygon = polygonNodes;
	for (let current = 0; current < clipperNodes.length; current++) {
		const next = (current + 1) % clipperNodes.length;
		polygon = edgeClipPolygon(clipperNodes[current], clipperNodes[next], polygon);

		if (polygon.length < 3) {
			return [];
		}
	}

	console.log(polygon);
	polygon.push(polygon[0]);

	return polygon;
}
