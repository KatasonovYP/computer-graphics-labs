import { useErrorToast } from 'shared/hooks';

import { useShapesStore } from '../store';

export function useClosePolygon(): { closePolygonHandler: () => void } {
	const polygon = useShapesStore((state) => state.polygon);
	const closePolygon = useShapesStore((state) => state.closePolygon);
	const { showErrorToast } = useErrorToast();

	function closePolygonHandler(): void {
		if (polygon.length < 3) {
			showErrorToast('not enough points');
			throw new Error('not enough points');
		}
		closePolygon();
	}
	return { closePolygonHandler };
}
