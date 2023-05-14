import { type FC } from 'react';
import { Circle } from 'react-konva';

import { useShapesStore } from '../../store';
import { IPolygon } from '../../model';

interface Properties {
	polygon: IPolygon;
	isClosed: boolean;
	color: string;
}

export const DrawPolygonPoints: FC<Properties> = ({ polygon, isClosed, color }) => {
	return (
		<>
			{!isClosed &&
				polygon.map((point, key) => (
					<Circle
						key={key}
						x={point[0]}
						y={point[1]}
						fill={color}
						radius={3}
					/>
				))}
		</>
	);
};
