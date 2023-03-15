import { type FC } from 'react';
import { Line } from 'react-konva';

import { useFigureStore } from 'shared/lib';

const DrawEdges: FC = () => {
	const edges = useFigureStore((state) => state.edges);
	const points = useFigureStore((state) => state.points);
	return (
		<>
			{edges.map((event, key) => (
				<Line
					points={[points[event[0]].x, points[event[0]].y, points[event[1]].x, points[event[1]].y]}
					stroke='#88F'
					strokeWidth={2}
					key={key}
				/>
			))}
		</>
	);
};

export default DrawEdges;
