export interface ICutter {
	xLeft: number;
	xRight: number;
	yDown: number;
	yUp: number;
}

export type IFlatPoint = [number, number];
export type IFlatLine = [number, number, number, number];

export interface ILine {
	color: string;
	points: IFlatLine;
}

export type IPolygon = IFlatPoint[];
