import { EMethod, type IMethodFunctionType } from '../../model';

import { dda } from './dda';
import { bresenhamInteger } from './bresenham-integer';
import { bresenhamSmooth } from './bresenham-smooth';
import { bresenhamFloat } from './bresenham-float';
import { wu } from './wu';

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
