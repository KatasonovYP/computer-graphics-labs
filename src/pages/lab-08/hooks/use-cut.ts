import { chakraColorToHex } from 'shared/lib';

import { useErrorToast } from 'shared/hooks';

import { useShapesStore } from '../store';
import { getConvexityPolygon, cyrusBeckAlg } from '../lib';

export function useCut(): { cutLinesHandler: () => void } {
	const polygon = useShapesStore((state) => state.polygon);
	const lines = useShapesStore((state) => state.lines);
	const addCut = useShapesStore((state) => state.addCut);
	const clearCuts = useShapesStore((state) => state.clearCuts);
	const isClosed = useShapesStore((state) => state.isClosed);
	const { showErrorToast } = useErrorToast();

	function cutLinesHandler(): void {
		if (!isClosed) {
			showErrorToast('the cutter not closed');
			throw new Error('the cutter not closed');
		}
		if (lines.length === 0) {
			showErrorToast('no lines');
			throw new Error('no lines');
		}
		const convexity = getConvexityPolygon(polygon);
		if (convexity === 0) {
			showErrorToast('not convex');
			throw new Error('not convex');
		}

		const polygonCurrent = convexity === 1 ? polygon.slice(0, -1) : polygon.slice(0, -1).reverse();
		console.table(polygon);
		clearCuts();

		for (const line of lines) {
			const cut = cyrusBeckAlg(
				[
					[line.points[0], line.points[1]],
					[line.points[2], line.points[3]],
				],
				polygonCurrent,
			);
			if (cut)
				addCut({
					points: cut,
					color: chakraColorToHex('yellow.300'),
				});
		}
	}
	return { cutLinesHandler };
}
