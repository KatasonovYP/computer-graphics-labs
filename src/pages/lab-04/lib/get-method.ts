import { type Irgba } from 'shared/model';

import { EMethod, type IPosition, type Pixel } from '../model';

import { canonicalCircle } from './canonical-circle';
import { parametricCircle } from './parametric-circle';

export type IMethodFunctionType = (center: IPosition, radius: number, color: Irgba) => Pixel[];

export function getMethod(name: EMethod): IMethodFunctionType {
	switch (name) {
		case EMethod.Canonical: {
			return canonicalCircle;
		}
		case EMethod.PARAMETER: {
			return parametricCircle;
		}
		default: {
			return canonicalCircle;
		}
	}
}
