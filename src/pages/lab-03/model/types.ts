import { type IPoint } from './point';

export interface ILine {
	color: string;
	pixels: IPoint[];
}

export enum EMethod {
	DDA = 'DDA',
	BREZENHEIM_INT = 'brezenheim-integer',
}
