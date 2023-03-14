import { type FC } from 'react';
import { Line } from 'react-konva';

import useFigureStore from '../../../../shared/lib/store/figureStore';

const DrawNose: FC = () => {
	const points = useFigureStore((state) => state.points);
	return (
		<>
			<Line
				points={[
					points[12].x,
					points[12].y,
					points[13].x,
					points[13].y,
					points[37].x,
					points[37].y,
					points[12].x,
					points[12].y,
				]}
				strokeWidth={5}
				fill='#00F'
				closed={true}
			/>
		</>
	);
};

export default DrawNose;
