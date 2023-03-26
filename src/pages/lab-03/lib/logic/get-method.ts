import { EMethod, type IMethodFunctionType } from '../../model';

import { dda } from './methods/dda';
import { bresenhamFloat, bresenhamInteger, bresenhamSmooth } from './methods/bresenham';
import { wu } from './methods/wu';

export function getMethod(name: EMethod): IMethodFunctionType {
	switch (name) {
		case EMethod.DDA: {
			return dda;
		}
		case EMethod.BRESENHAM_INT: {
			return bresenhamInteger;
		}

		case EMethod.BRESENHAM_FLOAT: {
			return bresenhamFloat;
		}

		case EMethod.BRESENHAM_SMOOTH: {
			return bresenhamSmooth;
		}

		case EMethod.WU: {
			return wu;
		}

		default: {
			return dda;
		}
	}
}
