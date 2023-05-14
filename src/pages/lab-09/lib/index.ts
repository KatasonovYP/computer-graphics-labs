import { type IFlatLine, type IFlatPoint, type IPolygon } from '../model';

type IVector = IFlatPoint;

function scalarProduct(vectorA: IVector, vectorB: IVector): number {
	return vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1];
}

function getVector(dotStart: IFlatPoint, dotEnd: IFlatPoint): IVector {
	return [dotEnd[0] - dotStart[0], dotEnd[1] - dotStart[1]];
}

function vectorProduct(vectorA: IVector, vectorB: IVector): number {
	return vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0];
}

export function getConvexityPolygon(cutter: IPolygon): -1 | 0 | 1 {
	if (cutter.length < 3) {
		return 0;
	}

	const vector1 = getVector(cutter[0], cutter[1]);
	const vector2 = getVector(cutter[1], cutter[2]);

	const sign = vectorProduct(vector1, vector2) > 0 ? 1 : -1;

	for (let index = 0; index < cutter.length; index++) {
		const vectorI: IVector = getVector(
			cutter[(index - 2 + cutter.length) % cutter.length],
			cutter[(index - 1 + cutter.length) % cutter.length],
		);
		const vectorJ: IVector = getVector(cutter[(index - 1 + cutter.length) % cutter.length], cutter[index]);

		if (sign * vectorProduct(vectorI, vectorJ) < 0) {
			return 0;
		}
	}

	if (sign < 0) {
		return -1;
	}

	return 1;
}

function getNormal(dot1: IFlatPoint, dot2: IFlatPoint, dot3: IFlatPoint): IVector {
	const vector: IVector = getVector(dot1, dot2);

	const normal: IVector = vector[1] === 0 ? [0, 1] : [1, -vector[0] / vector[1]];

	if (scalarProduct(getVector(dot2, dot3), normal) < 0) {
		normal[0] *= -1;
		normal[1] *= -1;
	}

	return normal;
}

export function sutherlandHodgman(shape: IPolygon, clipperFigure: IPolygon): IPolygon | null {
	return null;
}
