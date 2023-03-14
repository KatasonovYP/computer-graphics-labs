import { type FC } from 'react';
import { Line } from 'react-konva';

import useFigureStore from '@shared/lib/store/figureStore';

const DrawEdges: FC = () => {
	const edges = useFigureStore((state) => state.edges);
	const points = useFigureStore((state) => state.points);
	return (
		<>
			{edges.map((e, key) => (
				<Line
					points={[points[e[0]].x, points[e[0]].y, points[e[1]].x, points[e[1]].y]}
					stroke='#88F'
					strokeWidth={2}
					key={key}
				/>
			))}
		</>
	);
};

export default DrawEdges;
