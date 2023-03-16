import { expect, test } from 'vitest';

import { Point } from './point';

test('is same', () => {
	const first = new Point({ x: 10, y: 15 });
	const second = new Point({ x: 10, y: 15 });
	expect(first.eq(second)).toBe(true);
});
test('move', () => {
	const first = new Point({ x: 10, y: 15 });
	first.move(2, 3);
	const second = new Point({ x: 12, y: 18 });
	expect(first.eq(second)).toBe(true);
});
