import { type FC } from 'react';
import { Circle, Line } from 'react-konva';

import { useShapesStore } from '../../store';
import { DrawPolygonPoints } from './draw-polygon-points';

export const DrawPolygon: FC = () => {
	const polygon = useShapesStore((state) => state.polygon);
	const isClosed = useShapesStore((state) => state.isClosed);
	return (
		<>
			{!isClosed && <DrawPolygonPoints />}
			<Line
				points={polygon.flat()}
				stroke={'#008888'}
				strokeWidth={2}
			/>
		</>
	);
};
