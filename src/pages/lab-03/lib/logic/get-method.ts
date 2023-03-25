import { EMethod, type IMethodFunctionType } from '../../model';

import { dda } from './dda';
import { brezenhemInteger } from './brezenhem-integer';
import { brezenhemSmooth } from './brezenhem-smooth';
import { brezenhemFloat } from './brezenhem-float';

export function getMethod(name: EMethod): IMethodFunctionType {
	switch (name) {
		case EMethod.DDA: {
			return dda;
		}
		case EMethod.BREZENHEIM_INT: {
			return brezenhemInteger;
		}

		case EMethod.BREZENHEIM_FLOAT: {
			return brezenhemFloat;
		}

		case EMethod.BREZENHEIM_SMOOTH: {
			return brezenhemSmooth;
		}

		default: {
			return dda;
		}
	}
}
