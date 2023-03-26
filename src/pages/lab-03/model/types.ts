import { type IPoint } from './point';

export interface ILine {
	firstPoint: IPoint;
	secondPoint: IPoint;
	color: string;
	pixels: IPoint[];
}

export type IMethodFunctionType = (startPoint: IPoint, endPoint: IPoint) => [IPoint[], number];

export enum EMethod {
	DDA = 'DDA',
	BRESENHAM_INT = 'bresenham-integer',
	BRESENHAM_FLOAT = 'bresenham-float',
	BRESENHAM_SMOOTH = 'bresenham-smooth',
	WU = 'vu',
}
