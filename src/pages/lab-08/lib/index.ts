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

export function cyrusBeckAlg(line: [IFlatPoint, IFlatPoint], clipperFigure: IPolygon): IFlatLine | null {
	let tBeg = 0;
	let tEnd = 1;

	const [dot1, dot2] = line;

	const directrix: IVector = [dot2[0] - dot1[0], dot2[1] - dot1[1]]; // директриса

	for (let index = -2; index < clipperFigure.length - 2; index++) {
		const currentDot = clipperFigure.at(index) as IFlatPoint;
		const normal = getNormal(
			currentDot,
			clipperFigure.at(index + 1) as IFlatPoint,
			clipperFigure.at(index + 2) as IFlatPoint,
		);

		const weight: IVector = [dot1[0] - currentDot[0], dot1[1] - currentDot[1]];

		const dScalar = scalarProduct(directrix, normal);
		const wScalar = scalarProduct(weight, normal);

		if (dScalar === 0) {
			if (wScalar < 0) {
				return null;
			}
			continue;
		}

		const t = -wScalar / dScalar;

		if (dScalar > 0) {
			if (t <= 1) {
				tBeg = Math.max(tBeg, t);
			} else {
				return null;
			}
		} else if (dScalar < 0) {
			if (t >= 0) {
				tEnd = Math.min(tEnd, t);
			} else {
				return null;
			}
		}

		if (tBeg > tEnd) {
			break;
		}
	}

	if (tBeg <= tEnd) {
		const dot1Result: IFlatPoint = [
			Math.round(dot1[0] + directrix[0] * tBeg),
			Math.round(dot1[1] + directrix[1] * tBeg),
		];
		const dot2Result: IFlatPoint = [
			Math.round(dot1[0] + directrix[0] * tEnd),
			Math.round(dot1[1] + directrix[1] * tEnd),
		];

		return [...dot1Result, ...dot2Result];
	}
	return null;
}
