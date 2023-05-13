import { type FC } from 'react';

import { Button } from '@chakra-ui/react';

import { chakraColorToHex } from 'shared/lib';

import { useShapesStore } from '../store';
import { clipping } from '../lib';

export const ButtonCut: FC = () => {
	const polygon = useShapesStore((state) => state.polygon);
	const lines = useShapesStore((state) => state.lines);
	const addCut = useShapesStore((state) => state.addCut);
	const clearCuts = useShapesStore((state) => state.clearCuts);
	const isClosed = useShapesStore((state) => state.isClosed);

	function cutLinesHandler(): void {
		if (!isClosed) throw new Error('no rectangle');
		if (lines.length === 0) throw new Error('no lines');

		clearCuts();

		for (const line of lines) {
			const result = clipping(line.points, polygon);
			if (result)
				addCut({
					points: result,
					color: chakraColorToHex('yellow.300'),
				});
		}
	}

	return (
		<Button
			onClick={cutLinesHandler}
			colorScheme={'blue'}
		>
			Cut
		</Button>
	);
};
