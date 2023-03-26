import { type IPoint } from './point';

export interface ILine {
	firstPoint: IPoint;
	secondPoint: IPoint;
	color: string;
	pixels: IPoint[];
}

export type IMethodFunctionType = (startPoint: IPoint, endPoint: IPoint) => IPoint[];

export enum EMethod {
	DDA = 'DDA',
	BRESENHAM_INT = 'Bresenham-integer',
	BRESENHAM_FLOAT = 'Bresenham-float',
	BRESENHAM_SMOOTH = 'Bresenham-smooth',
	WU = 'Wu',
}
