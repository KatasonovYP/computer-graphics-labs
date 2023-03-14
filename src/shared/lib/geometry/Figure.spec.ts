import { expect, test } from 'vitest';
import Figure from './Figure';

test('is same', () => {
	let first = new Figure({ x: 0, y: 0 },[
		{ x: 0, y: 0 },
		{ x: 1, y: 2 },
	]);
	let result = new Figure({ x: 0, y: 0 },[
		{ x: 0, y: 0 },
		{ x: 1, y: 2 },
	]);
	expect(first.eq(result)).toBe(true);
});
test('is not same', () => {
	let first = new Figure({ x: 0, y: 0 }, [
		{ x: 0, y: 0 },
		{ x: 1, y: 3 },
	]);
	let result = new Figure({ x: 0, y: 0 },[
		{ x: 0, y: 0 },
		{ x: 1, y: 2 },
	]);
	expect(first.eq(result)).toBe(false);
});

test('move', () => {
	let fig = new Figure({ x: 0, y: 0 },[
		{ x: 0, y: 0 },
		{ x: 1, y: 1 },
	]);
	fig.move(2, 3);
	let result = new Figure({ x: 0, y: 0 },[
		{ x: 2, y: 3 },
		{ x: 3, y: 4 },
	]);
	expect(fig.eq(result)).toBe(true);
});
