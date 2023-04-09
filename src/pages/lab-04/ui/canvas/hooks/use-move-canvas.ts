import { type MouseEvent, useState } from 'react';

import { type IPosition } from '../../../model';

export type moveCanvasHandlerType = (event: MouseEvent<HTMLCanvasElement>) => void;
export function useMoveCanvas(scale: number): [IPosition, moveCanvasHandlerType] {
	const [centerPosition, setCenterPosition] = useState<IPosition>({ x: 0, y: 0 });

	function moveCanvas(event: MouseEvent<HTMLCanvasElement>): void {
		if (event.buttons > 0) {
			displace(event.movementX / scale, event.movementY / scale);
		}
	}

	function displace(dx: number, dy: number): void {
		setCenterPosition((state) => {
			return {
				x: state.x + dx,
				y: state.y + dy,
			};
		});
	}

	return [centerPosition, moveCanvas];
}
