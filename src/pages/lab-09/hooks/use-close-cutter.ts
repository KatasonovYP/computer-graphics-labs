import { useErrorToast } from 'shared/hooks';

import { useShapesStore } from '../store';

export function useCloseCutter(): { closeCutterHandler: () => void } {
	const cutter = useShapesStore((state) => state.cutter);
	const closeCutter = useShapesStore((state) => state.closeCutter);
	const { showErrorToast } = useErrorToast();

	function closeCutterHandler(): void {
		if (cutter.length < 3) {
			showErrorToast('not enough points');
			throw new Error('not enough points');
		}
		closeCutter();
	}
	return { closeCutterHandler };
}
