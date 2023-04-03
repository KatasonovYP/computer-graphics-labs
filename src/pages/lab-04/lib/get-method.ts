import { type Irgba } from 'shared/model';

import { EMethod, type IPosition, type Pixel } from '../model';

import { canonicalCircle } from './canonical-circle';

export type IMethodFunctionType = (center: IPosition, radius: number, color: Irgba) => Pixel[];

export function getMethod(name: EMethod): IMethodFunctionType {
	switch (name) {
		case EMethod.Canonical: {
			return canonicalCircle;
		}
		default: {
			return canonicalCircle;
		}
	}
}
