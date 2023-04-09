import { type Irgba } from 'shared/model';

import { isNever } from 'shared/lib';

import { EMethod, type IPosition, type Pixel } from '../model';

import { canonicalCircle } from './circle/canonical-circle';
import { parametricCircle } from './circle/parametric-circle';
import { bresenhamCircle } from './circle/bresenham-circle';
import { midpointCircle } from './circle/midpoint-circle';

export type IMethodFunctionType = (center: IPosition, radius: number, color: Irgba) => Pixel[];

export function getMethod(name: EMethod): IMethodFunctionType {
	switch (name) {
		case EMethod.Canonical: {
			return canonicalCircle;
		}
		case EMethod.Parametric: {
			return parametricCircle;
		}
		case EMethod.Bresenham: {
			return bresenhamCircle;
		}
		case EMethod.Midpoint: {
			return midpointCircle;
		}
		default: {
			return isNever(name);
		}
	}
}
