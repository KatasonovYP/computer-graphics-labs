import { type FC } from 'react';
import { Rect } from 'react-konva';

import { type ILine } from '../model';

interface Properties {
	line: ILine;
}

export const DrawLine: FC<Properties> = ({ line }: Properties) => {
	return (
		<>
			{line.pixels.map((pixel, key) => (
				<Rect
					key={key}
					x={pixel.x}
					y={pixel.y}
					fill={line.color}
					width={1}
					height={1}
				/>
			))}
		</>
	);
};
