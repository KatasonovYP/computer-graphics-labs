import { useErrorToast } from 'shared/hooks';

import { useShapesStore } from '../store';
import { getConvexityPolygon, sutherlandHodgman } from '../lib';

export function useCut(): { cutLinesHandler: () => void } {
	const shape = useShapesStore((state) => state.shape);
	const cutter = useShapesStore((state) => state.cutter);
	const isClosedShape = useShapesStore((state) => state.isClosedShape);
	const isClosedCutter = useShapesStore((state) => state.isClosedCutter);
	const clearCutoff = useShapesStore((state) => state.clearCutoff);
	const setCutoff = useShapesStore((state) => state.setCutoff);
	const { showErrorToast } = useErrorToast();

	function cutLinesHandler(): void {
		if (!isClosedShape) {
			showErrorToast('the shape not closed');
			throw new Error('the shape not closed');
		}
		if (!isClosedCutter) {
			showErrorToast('the cutter not closed');
			throw new Error('the cutter not closed');
		}
		const convexity = getConvexityPolygon(cutter);
		if (convexity === 0) {
			showErrorToast('not convex');
			throw new Error('not convex');
		}

		let cutterNormalized = [...cutter];
		let shapeNormalized = [...shape];

		let result = sutherlandHodgman(shapeNormalized, cutterNormalized);

		if (result.length === 0) {
			cutterNormalized = [...cutter];
			shapeNormalized = [...shape].reverse();
			result = sutherlandHodgman(shapeNormalized, cutterNormalized);
		}

		if (result.length === 0) {
			cutterNormalized = [...cutter].reverse();
			shapeNormalized = [...shape];
			result = sutherlandHodgman(shapeNormalized, cutterNormalized);
		}

		if (result.length === 0) {
			cutterNormalized = [...cutter].reverse();
			shapeNormalized = [...shape].reverse();
			result = sutherlandHodgman(shapeNormalized, cutterNormalized);
		}

		clearCutoff();

		setCutoff(sutherlandHodgman(shapeNormalized, cutterNormalized));
	}

	return { cutLinesHandler };
}
