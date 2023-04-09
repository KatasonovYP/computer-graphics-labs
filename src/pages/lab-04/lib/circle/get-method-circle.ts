import { type Irgba } from 'shared/model';

import { isNever } from 'shared/lib';

import { EMethod, type IPosition, type Pixel } from '../../model';

import { canonicalCircle } from './canonical-circle';
import { parametricCircle } from './parametric-circle';
import { bresenhamCircle } from './bresenham-circle';
import { midpointCircle } from './midpoint-circle';

export type IMethodFunctionType = (center: IPosition, radius: number, color: Irgba) => Pixel[];

export function getMethodCircle(name: EMethod): IMethodFunctionType {
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
