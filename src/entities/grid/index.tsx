import { type FC, type ReactNode, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { type KonvaEventObject } from 'konva/lib/Node';

import { type IStage } from './model/types';
import { drawLines } from './ui/draw-lines';

interface Properties {
	sideLength: number;
	children: ReactNode;
}

export const Grid: FC<Properties> = ({ sideLength, children }: Properties) => {
	const [stage, setStage] = useState<IStage>({
		x: 0,
		y: 0,
		width: sideLength,
		height: sideLength,
		scale: 1,
	});

	const moveHandler = (event: KonvaEventObject<MouseEvent>): void => {
		const pos = event.currentTarget.position();
		const x = pos.x;
		const y = pos.y;
		setStage({ ...stage, x, y });
	};

	// scale
	const scaleHandler = (event: KonvaEventObject<WheelEvent>): void => {
		event.evt.preventDefault();

		const scaleBy = 1.02;
		const newStage = event.target.getStage();

		if (newStage === null) return;

		const pointer = newStage.getPointerPosition();

		if (pointer === null) return;

		const oldScale = stage.scale;
		const mousePointTo = {
			x: (pointer.x - newStage.x()) / oldScale,
			y: (pointer.y - newStage.y()) / oldScale,
		};

		const newScale = event.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

		setStage({
			...stage,
			x: pointer.x - mousePointTo.x * newScale,
			y: pointer.y - mousePointTo.y * newScale,
			scale: newScale,
		});
	};

	return (
		<Stage
			className='canvas'
			draggable
			width={stage.width}
			height={stage.height}
			scaleX={stage.scale}
			scaleY={stage.scale}
			x={stage.x}
			y={stage.y}
			onWheel={scaleHandler}
			onDragMove={moveHandler}
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
	);
};
