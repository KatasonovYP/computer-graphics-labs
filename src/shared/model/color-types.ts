import { type theme as chakraTheme } from '@chakra-ui/theme';

export type ColorToken = keyof typeof chakraTheme.colors;
export type ColorShade = keyof (typeof chakraTheme.colors)[ColorToken];

export interface Irgba {
	r: number;
	g: number;
	b: number;
	a: number;
}
