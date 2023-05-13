import { type FC } from 'react';
import { Line, Rect } from 'react-konva';

import { useFigureStore } from 'shared/lib';

import { useShapesStore } from '../../store';

export const DrawRectangle: FC = () => {
	const rectangle = useShapesStore((state) => state.rectangle);
	return (
		<>
			{rectangle !== null && (
				<Rect
					x={rectangle.x}
					y={rectangle.y}
					width={rectangle.width}
					height={rectangle.height}
					stroke={rectangle.color}
					strokeWidth={2}
				/>
			)}
		</>
	);
};
