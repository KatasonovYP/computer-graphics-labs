import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { type IPoint, Pixel } from 'shared/model';

import { drawLine } from '../lib/draw-line';
import produce from 'immer';

type Figure = IPoint[];

interface State {
	figures: Figure[];
	pixels: Pixel[];
	points: IPoint[];
	seedPixel: Pixel | null;
}

interface Actions {
	addPoint: (point: IPoint) => void;
	closeFigure: () => void;
	fillFigures: () => void;
	clear: () => void;
	pushPixels: (pixels: Pixel[]) => void;
	setSeedPixel: (seedPixel: IPoint) => void;
}

type IStore = State & Actions;

export const useFiguresStore = create(
	immer<IStore>((set, get): IStore => {
		return {
			points: [],
			pixels: [],
			figures: [],
			seedPixel: null,

			addPoint(point: IPoint): void {
				const lastPoint = get().points[get().points.length - 1] || point;
				const linePixels = drawLine(lastPoint, point);
				set(
					produce((state) => {
						state.points.push(point);
						state.pixels.push(...linePixels);
					}),
				);
			},

			closeFigure(): void {
				set((state): IStore => {
					const firstPoint = get().points[0];
					const lastPoint = get().points[get().points.length - 1];
					const linePixels = firstPoint || lastPoint ? drawLine(firstPoint, lastPoint) : [];
					const newFigure = [...state.points, state.points[0]];
					return {
						...state,
						figures: [...state.figures, newFigure],
						pixels: [...state.pixels, ...linePixels],
						points: [],
					};
				});
			},

			fillFigures(): void {},

			pushPixels(pixels: Pixel[]): void {
				set(
					produce((state) => {
						state.pixels.push(...pixels);
					}),
				);
			},

			setSeedPixel(point: IPoint): void {
				set({ seedPixel: new Pixel(point.x, point.y) });
			},

			clear(): void {
				set({ points: [], figures: [], pixels: [] });
			},
		};
	}),
);
