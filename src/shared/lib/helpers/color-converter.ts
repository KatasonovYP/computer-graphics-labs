import { theme as chakraTheme } from '@chakra-ui/react';

import type { ColorShade, ColorToken } from 'shared/model';

export function colorConverter(color: string): string {
	const [colorToken, colorShade] = color.split('.');
	const ColorShadeChecked: ColorShade = (Number.parseInt(colorShade) as ColorShade) || 500;
	const colorTokenChecked: ColorToken = colorToken as ColorToken;

	const colorValue = chakraTheme.colors[colorTokenChecked][ColorShadeChecked];
	if (!colorValue) {
		throw new Error(`Invalid color token "${colorToken}" or shade "${colorShade}"`);
	}

	return colorValue.toString().padStart(6, '0');
}
