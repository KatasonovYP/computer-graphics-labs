import { HEIGHT, WIDTH } from 'shared/config';

import { Stroke, useCanvas } from 'entities/performant-canvas';

import { useFiguresStore } from '../../store';

import { useClickHandle } from './use-click-handle';

import type { FC } from 'react';

export const PerformantCanvas: FC = () => {
	const pixels = useFiguresStore((state) => state.pixels);
	const { centerPosition, canvasReference, moveCanvas, scaleCanvas } = useCanvas(pixels);
	const clickHandler = useClickHandle(centerPosition, canvasReference);

	return (
		<Stroke>
			<canvas
				ref={canvasReference}
				onWheel={scaleCanvas}
				onMouseMove={moveCanvas}
				onClick={clickHandler}
				height={HEIGHT}
				width={WIDTH}
			/>
		</Stroke>
	);
};
