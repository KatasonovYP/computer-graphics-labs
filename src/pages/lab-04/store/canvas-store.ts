import { create } from 'zustand';

import { type MouseEvent } from 'react';

import { type IPosition, type Pixel } from '../model';

interface ICanvasStore {
	centerPosition: IPosition;
	figures: Pixel[][];

	moveCanvas: (event: MouseEvent<HTMLCanvasElement>) => void;
	displace: (dx: number, dy: number) => void;
	setPosition: (x: number, y: number) => void;

	pushFigure: (figure: Pixel[]) => void;
	setFigures: (figures: Pixel[][]) => void;
}

export const useCanvasStore = create<ICanvasStore>(
	(set, get): ICanvasStore => ({
		centerPosition: { x: 0, y: 0 },
		figures: [],

		moveCanvas(event: MouseEvent<HTMLCanvasElement>): void {
			if (event.buttons > 0) {
				get().displace(event.movementX, event.movementY);
			}
		},

		displace(dx: number, dy: number) {
			const { x, y } = get().centerPosition;
			get().setPosition(x + dx, y + dy);
		},

		setPosition(x: number, y: number) {
			set((state): ICanvasStore => ({ ...state, centerPosition: { x, y } }));
		},

		pushFigure(figure: Pixel[]) {
			get().setFigures([...get().figures, figure]);
		},

		setFigures(figures: Pixel[][]) {
			set((state): ICanvasStore => ({ ...state, figures }));
		},
	}),
);
