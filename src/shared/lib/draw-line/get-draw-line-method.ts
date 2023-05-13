import { type IOOPoint } from 'shared/model';

import { dda } from './methods/dda';
import { bresenhamFloat, bresenhamInteger, bresenhamSmooth } from './methods/bresenham';
import { wu } from './methods/wu';

export type IDrawLineMethodFunctionType = (startPoint: IOOPoint, endPoint: IOOPoint) => IOOPoint[];
export enum EDrawLineMethod {
	DDA = 'DDA',
	BRESENHAM_INT = 'Bresenham-integer',
	BRESENHAM_FLOAT = 'Bresenham-float',
	BRESENHAM_SMOOTH = 'Bresenham-smooth',
	WU = 'Wu',
}

export function getDrawLineMethod(name: EDrawLineMethod): IDrawLineMethodFunctionType {
	switch (name) {
		case EDrawLineMethod.DDA: {
			return dda;
		}
		case EDrawLineMethod.BRESENHAM_INT: {
			return bresenhamInteger;
		}

		case EDrawLineMethod.BRESENHAM_FLOAT: {
			return bresenhamFloat;
		}

		case EDrawLineMethod.BRESENHAM_SMOOTH: {
			return bresenhamSmooth;
		}

		case EDrawLineMethod.WU: {
			return wu;
		}

		default: {
			return dda;
		}
	}
}
