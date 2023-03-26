import { type FC } from 'react';

import { useLinesStore } from '../../store/lines-store';

import { DrawLine } from './draw-line';

export const DrawLines: FC = () => {
	const lines = useLinesStore((state) => state.lines);
	return (
		<>
			{lines.map((line, key) => (
				<DrawLine
					key={key}
					line={line}
				/>
			))}
		</>
	);
};
