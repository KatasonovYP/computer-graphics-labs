export function getNear(number_: number, step: number): number {
	return Math.ceil(number_ * (1 / step)) * step;
}
