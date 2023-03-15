import { expect, test } from 'vitest';

import Figure from './figure';

test('is same', () => {
	const first = new Figure({ x: 0, y: 0 }, [
		{ x: 0, y: 0 },
		{ x: 1, y: 2 },
	]);
	const result = new Figure({ x: 0, y: 0 }, [
		{ x: 0, y: 0 },
		{ x: 1, y: 2 },
	]);
	expect(first.eq(result)).toBe(true);
});
test('is not same', () => {
	const first = new Figure({ x: 0, y: 0 }, [
		{ x: 0, y: 0 },
		{ x: 1, y: 3 },
	]);
	const result = new Figure({ x: 0, y: 0 }, [
		{ x: 0, y: 0 },
		{ x: 1, y: 2 },
	]);
	expect(first.eq(result)).toBe(false);
});

test('move', () => {
	const fig = new Figure({ x: 0, y: 0 }, [
		{ x: 0, y: 0 },
		{ x: 1, y: 1 },
	]);
	fig.move(2, 3);
	const result = new Figure({ x: 0, y: 0 }, [
		{ x: 2, y: 3 },
		{ x: 3, y: 4 },
	]);
	expect(fig.eq(result)).toBe(true);
});
