import { useErrorToast } from 'shared/hooks';

import { useShapesStore } from '../store';

export function useCloseShape(): { closeShapeHandler: () => void } {
	const shape = useShapesStore((state) => state.shape);
	const closeShape = useShapesStore((state) => state.closeShape);
	const { showErrorToast } = useErrorToast();

	function closeShapeHandler(): void {
		if (shape.length < 3) {
			showErrorToast('not enough points');
			throw new Error('not enough points');
		}
		closeShape();
	}
	return { closeShapeHandler };
}
