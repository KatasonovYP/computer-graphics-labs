import React from 'react';
import useFigureStore from '@shared/lib/store/figureStore';
import { Circle } from 'react-konva';

const DrawPoints = () => {
	const points = useFigureStore((state) => state.points);
	return (
		<>
			{points.map((p, key) => (
				<Circle
					key={key}
					x={p.x}
					y={p.y}
					fill="#44F"
					radius={3}
					onClick={() => console.log(key)}
				/>
			))}
		</>
	);
};

export default DrawPoints;
