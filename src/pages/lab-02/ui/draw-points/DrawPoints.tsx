import { type FC } from 'react';
import { Circle } from 'react-konva';

import useFigureStore from '@shared/lib/store/figureStore';

const DrawPoints: FC = () => {
	const points = useFigureStore((state) => state.points);
	console.log(points);
	return (
		<>
			{points.map((p, key) => (
				<Circle
					key={key}
					x={p.x}
					y={p.y}
					fill='#44F'
					radius={3}
					onClick={() => {
						console.log(key);
					}}
				/>
			))}
		</>
	);
};

export default DrawPoints;
