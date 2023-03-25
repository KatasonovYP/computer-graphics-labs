import { type FC } from 'react';
import { Rect } from 'react-konva';

import { type ILine } from '../model';
import { useLinesStore } from '../store/lines-store';

interface Properties {
	line: ILine;
}

export const DrawLine: FC<Properties> = ({ line }: Properties) => {
	const choosing = useLinesStore((state) => state.choosing);
	const setChoosing = useLinesStore((state) => state.setChoosing);
	const setTarget = useLinesStore((state) => state.setTarget);

	const setMouseOver = useLinesStore((state) => state.setMouseOver);
	const setMouseLeave = useLinesStore((state) => state.setMouseLeave);

	return (
		<>
			{line.pixels.map((pixel, key) => {
				pixel.parent = line;
				return (
					<Rect
						key={key}
						x={pixel.x}
						y={pixel.y}
						fill={line.currentColor}
						width={1}
						height={1}
						onClick={(event) => {
							if (choosing) {
								setTarget(line);
								setChoosing(false);
							}
						}}
						onMouseOver={(event) => {
							if (choosing) {
								setMouseOver(line);
							}
						}}
						onMouseLeave={(event) => {
							if (choosing) {
								setMouseLeave(line);
							}
						}}
					/>
				);
			})}
		</>
	);
};
