import { type IPoint } from './point';

export interface ILine {
	firstPoint: IPoint;
	secondPoint: IPoint;
	color: string;
	pixels: IPoint[];
}

export type IMethodFunctionType = (a: IPoint, b: IPoint) => [IPoint[], number];

export enum EMethod {
	DDA = 'DDA',
	BREZENHEIM_INT = 'brezenheim-integer',
	BREZENHEIM_FLOAT = 'brezenheim-float',
	BREZENHEIM_SMOOTH = 'brezenheim-smooth',
}
