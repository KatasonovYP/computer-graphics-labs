import { create } from 'zustand';

import { type IPoint, type Pixel } from 'shared/model';

import { drawLine } from '../lib/draw-line';

type Figure = IPoint[];

interface IFiguresStore {
	figures: Figure[];
	pixels: Pixel[];
	points: IPoint[];
	addPoint: (point: IPoint) => void;
	closeFigure: () => void;
	clear: () => void;
}

export const useFiguresStore = create<IFiguresStore>((set, get): IFiguresStore => {
	return {
		points: [],
		pixels: [],
		figures: [],

		addPoint(point: IPoint): void {
			const lastPoint = get().points[get().points.length - 1] || point;
			const linePixels = drawLine(lastPoint, point);
			set((state) => ({
				points: [...state.points, point],
				pixels: [...state.pixels, ...linePixels],
			}));
		},

		closeFigure(): void {
			const firstPoint = get().points[0];
			const lastPoint = get().points[get().points.length - 1];
			const linePixels = firstPoint || lastPoint ? drawLine(firstPoint, lastPoint) : [];
			set((state): IFiguresStore => {
				const newFigure = [...state.points, state.points[0]];
				return {
					...state,
					figures: [...state.figures, newFigure],
					pixels: [...state.pixels, ...linePixels],
				};
			});
			set((state) => ({ points: [] }));
		},

		clear(): void {
			set({ points: [], figures: [], pixels: [] });
		},
	};
});
