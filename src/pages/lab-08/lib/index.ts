import { type IFlatLine, type IPolygon } from '../model';

export function clipping(line: IFlatLine, polygon: IPolygon): IFlatLine {
	return [0, 0, 0, 0];
}
