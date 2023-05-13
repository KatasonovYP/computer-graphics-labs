import { type FC } from 'react';

import { Button } from '@chakra-ui/react';

import { chakraColorToHex } from 'shared/lib';

import { useShapesStore } from '../store';
import { simpleClipping } from '../lib';

export const ButtonCut: FC = () => {
	const rectangle = useShapesStore((state) => state.rectangle);
	const lines = useShapesStore((state) => state.lines);
	const addCut = useShapesStore((state) => state.addCut);
	const clearCuts = useShapesStore((state) => state.clearCuts);

	function cutLinesHandler(): void {
		if (!rectangle) throw new Error('no rectangle');
		if (lines.length === 0) throw new Error('no lines');

		clearCuts();

		for (const line of lines) {
			const result = simpleClipping(line.points, rectangle);
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
