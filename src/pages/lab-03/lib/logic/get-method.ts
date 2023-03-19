import { EMethod, type IPoint } from '../../model';

import { dda } from './dda';
import { brezenhemInteger } from './brezenhem-integer';

export function getMethod(name: EMethod): (a: IPoint, b: IPoint) => [IPoint[], number] {
	switch (name) {
		case EMethod.DDA: {
			return dda;
		}
		case EMethod.BREZENHEIM_INT: {
			return brezenhemInteger;
		}
		default: {
			return dda;
		}
	}
}
