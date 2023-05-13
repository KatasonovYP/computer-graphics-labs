import { type FC } from 'react';
import { Circle } from 'react-konva';

import { useShapesStore } from '../../store';

export const DrawPivot: FC = () => {
	const pivot = useShapesStore((state) => state.pivot);
	return (
		<>
			{pivot && (
				<Circle
					x={pivot.x}
					y={pivot.y}
					fill='#800'
					radius={3}
				/>
			)}
		</>
	);
};
