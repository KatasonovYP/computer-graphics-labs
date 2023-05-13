import { type FC } from 'react';
import { Circle } from 'react-konva';

import { useShapesStore } from '../../store';

export const DrawPolygonPoints: FC = () => {
	const polygon = useShapesStore((state) => state.polygon);
	return (
		<>
			{polygon.map((point, key) => (
				<Circle
					key={key}
					x={point[0]}
					y={point[1]}
					fill='#44F'
					radius={3}
				/>
			))}
		</>
	);
};
