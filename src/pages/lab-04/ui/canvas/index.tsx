import { HEIGHT, WIDTH } from 'shared/config';

import { useCanvasStore } from '../../store';

import { useCanvas } from './use-canvas';

import { Stroke } from './stroke';

import type { FC } from 'react';

export const PerformantCanvas: FC = () => {
	const moveCanvas = useCanvasStore((state) => state.moveCanvas);
	const canvasReference = useCanvas();

	return (
		<Stroke>
			<canvas
				ref={canvasReference}
				onMouseMove={moveCanvas}
				height={WIDTH}
				width={HEIGHT}
			/>
		</Stroke>
	);
};
