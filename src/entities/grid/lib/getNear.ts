export function getNear(num: number, step: number): number {
	return Math.ceil(num * (1 / step)) * step;
}
