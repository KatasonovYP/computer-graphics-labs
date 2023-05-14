import { type FC } from 'react';
import { Line } from 'react-konva';

import { type IPolygon } from '../../model';

interface Properties {
	polygon: IPolygon;
	color: string;
}

export const DrawPolygon: FC<Properties> = ({ polygon, color }) => {
	return (
		<Line
			points={polygon.flat()}
			stroke={color}
			strokeWidth={2}
		/>
	);
};
