import { useErrorToast } from 'shared/hooks';

import { useShapesStore } from '../store';

export function useParallels(): { addParallelsHandler: () => void } {
	const polygon = useShapesStore((state) => state.polygon);
	const addLine = useShapesStore((state) => state.addLine);
	const { showErrorToast } = useErrorToast();

	function addParallelsHandler(): void {
		if (polygon.length === 0) {
			showErrorToast('no polygon edges');
			throw new Error('no polygon edges');
		}
		const gap = 20;

		for (let index = 0; index < polygon.length - 1; ++index) {
			if (Math.random() > 0.7) {
				addLine({
					color: '#f44',
					points: [
						polygon[index][0] + gap,
						polygon[index][1] + gap,
						polygon[index + 1][0] + gap,
						polygon[index + 1][1] + gap,
					],
				});
				addLine({
					color: '#f44',
					points: [
						polygon[index][0] - gap,
						polygon[index][1] - gap,
						polygon[index + 1][0] - gap,
						polygon[index + 1][1] - gap,
					],
				});
			}
		}
	}

	return { addParallelsHandler };
}
