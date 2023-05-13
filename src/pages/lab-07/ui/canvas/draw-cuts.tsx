import { type FC } from 'react';
import { Line } from 'react-konva';

import { useShapesStore } from '../../store';

export const DrawCuts: FC = () => {
	const cuts = useShapesStore((state) => state.cuts);
	return (
		<>
			{cuts.map((cut, key) => (
				<Line
					points={cut.points}
					stroke={cut.color}
					strokeWidth={2}
					key={key}
				/>
			))}
		</>
	);
};
