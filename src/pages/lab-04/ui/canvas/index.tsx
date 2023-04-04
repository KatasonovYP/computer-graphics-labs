import { HEIGHT, WIDTH } from 'shared/config';

import { useFiguresStore } from '../../store';

import { useCanvas } from './hooks/use-canvas';

import { Stroke } from './stroke';

import type { FC } from 'react';

export const PerformantCanvas: FC = () => {
	const pixels = useFiguresStore((state) => state.pixels);
	const [canvasReference, moveCanvas] = useCanvas(pixels);

	return (
		<Stroke>
			<canvas
				ref={canvasReference}
				onMouseMove={moveCanvas}
				height={HEIGHT}
				width={WIDTH}
			/>
		</Stroke>
	);
};
