import { type Irgba , type IPosition, type Pixel } from 'shared/model';

import { isNever } from 'shared/lib';

import { EMethod } from '../../model';

import { bresenhamEllipse } from './bresenham-ellipse';
import { canonicalEllipse } from './canonical-ellipse';
import { parametricEllipse } from './parametric-ellipse';
import { midpointEllipse } from './midpoint-ellipse';

export type IMethodFunctionType = (center: IPosition, radius: IPosition, color: Irgba) => Pixel[];

export function getMethodEllipse(name: EMethod): IMethodFunctionType {
	switch (name) {
		case EMethod.Canonical: {
			return canonicalEllipse;
		}
		case EMethod.Parametric: {
			return parametricEllipse;
		}
		case EMethod.Bresenham: {
			return bresenhamEllipse;
		}
		case EMethod.Midpoint: {
			return midpointEllipse;
		}
		default: {
			return isNever(name);
		}
	}
}
