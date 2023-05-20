import { IFlatPoint } from '../model';

interface Point {
	x: number;
	y: number;
}

function area(a: Point, b: Point, c: Point): number {
	return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function intersect1(a: number, b: number, c: number, d: number): boolean {
	if (a > b) [a, b] = [b, a];
	if (c > d) [c, d] = [d, c];
	return Math.max(a, c) <= Math.min(b, d);
}

export function intersect(af: IFlatPoint, bf: IFlatPoint, cf: IFlatPoint, df: IFlatPoint): boolean {
	const a: Point = { x: af[0], y: af[1] };
	const b: Point = { x: bf[0], y: bf[1] };
	const c: Point = { x: cf[0], y: cf[1] };
	const d: Point = { x: df[0], y: df[1] };

	return (
		intersect1(a.x, b.x, c.x, d.x) &&
		intersect1(a.y, b.y, c.y, d.y) &&
		area(a, b, c) * area(a, b, d) < 0 &&
		area(c, d, a) * area(c, d, b) < 0
	);
}
