import { theme as chakraTheme } from '@chakra-ui/react';

import type { ColorShade, ColorToken, Irgba } from 'shared/model';

export const DEFAULT_RGBA_COLOR: Irgba = {
	r: 70,
	g: 70,
	b: 70,
	a: 70,
};

export function chakraColorToHex(color: string): string {
	const [colorToken, colorShade] = color.split('.');
	const ColorShadeChecked: ColorShade = (Number.parseInt(colorShade) as ColorShade) || 500;
	const colorTokenChecked: ColorToken = colorToken as ColorToken;

	const colorValue = chakraTheme.colors[colorTokenChecked][ColorShadeChecked];
	if (!colorValue) {
		throw new Error(`Invalid color token "${colorToken}" or shade "${colorShade}"`);
	}

	return colorValue.toString().padStart(6, '0');
}

export function hexToRGBA(hex: string): Irgba | undefined {
	const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
	if (result) {
		return {
			r: Number.parseInt(result[1], 16),
			g: Number.parseInt(result[2], 16),
			b: Number.parseInt(result[3], 16),
			a: 255,
		};
	}
	return undefined;
}

export function chakraColorToRGBA(color: string): Irgba | undefined {
	const hex = chakraColorToHex(color);
	return hexToRGBA(hex);
}
