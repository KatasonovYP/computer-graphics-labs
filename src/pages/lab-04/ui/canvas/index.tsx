import { HEIGHT, WIDTH } from 'shared/config';

import { Stroke, useCanvas } from 'entities/performant-canvas';

import { useFiguresStore } from '../../store';

import type { FC } from 'react';

export const PerformantCanvas: FC = () => {
	const pixels = useFiguresStore((state) => state.pixels);
	const { canvasReference, moveCanvas, scaleCanvas } = useCanvas(pixels);

	return (
		<Stroke>
			<canvas
				ref={canvasReference}
				onWheel={scaleCanvas}
				onMouseMove={moveCanvas}
				height={HEIGHT}
				width={WIDTH}
			/>
		</Stroke>
	);
};
