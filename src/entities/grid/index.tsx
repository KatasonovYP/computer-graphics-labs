import { type FC, type ReactNode } from 'react';
import { Layer, Stage } from 'react-konva';

import { type KonvaEventObject } from 'konva/lib/Node';

import { drawLines } from './ui/draw-lines';
import { Stroke } from './ui/stroke';
import { useMoveHandler } from './hooks/use-move-handler';
import { useScaleHandler } from './hooks/use-scale-handler';
import { useStage } from './hooks/use-stage';

type IOnClickHandler = (event: KonvaEventObject<MouseEvent>) => void;
interface Properties {
	scalable?: boolean;
	draggable?: boolean;
	onClickHandler?: IOnClickHandler;
	children?: ReactNode;
}

export const Grid: FC<Properties> = ({ onClickHandler, children, draggable = true, scalable = true }) => {
	const { stage, setStage } = useStage();
	const moveHandler = useMoveHandler(setStage);
	const scaleHandler = useScaleHandler(stage, setStage);

	return (
		<Stroke>
			<Stage
				className='canvas'
				draggable={draggable}
				width={stage.width}
				height={stage.height}
				scaleX={stage.scale}
				scaleY={stage.scale}
				x={stage.x}
				y={stage.y}
				onWheel={scalable ? scaleHandler : undefined}
				onDragMove={moveHandler}
				onClick={onClickHandler}
			>
				<Layer
					clipX={-stage.x / stage.scale}
					clipY={-stage.y / stage.scale}
					clipHeight={stage.height / stage.scale}
					clipWidth={stage.width / stage.scale}
				>
					{drawLines(stage)}

					{children}
				</Layer>
			</Stage>
		</Stroke>
	);
};
