import React from 'react';
import { Circle } from 'react-konva';
import useFigureStore from '../../../../shared/lib/store/figureStore';

const DrawCenter = () => {
	const pivot = useFigureStore((state) => state.pivot);
	return (
		<Circle
			x={pivot.x}
			y={pivot.y}
			fill="#F00"
			radius={5}
		/>
	);
};

export default DrawCenter;
