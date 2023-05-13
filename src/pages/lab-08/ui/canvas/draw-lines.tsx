import { type FC } from 'react';
import { Line } from 'react-konva';

import { useShapesStore } from '../../store';

export const DrawLines: FC = () => {
	const lines = useShapesStore((state) => state.lines);
	return (
		<>
			{lines.map((line, key) => (
				<Line
					points={line.points}
					stroke={line.color}
					strokeWidth={2}
					key={key}
				/>
			))}
		</>
	);
};
