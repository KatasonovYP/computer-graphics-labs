import { create } from 'zustand';

import { type Pixel } from '../model';

interface IFiguresStore {
	figures: Pixel[][];
	pixels: Pixel[];

	getPixels: () => Pixel[];
	setPixels: (pixels: Pixel[]) => void;

	pushFigure: (figure: Pixel[]) => void;
	cleanFigures: () => void;
	setFigures: (figures: Pixel[][]) => void;
}

export const useFiguresStore = create<IFiguresStore>(
	(set, get): IFiguresStore => ({
		figures: [],
		pixels: [],

		getPixels() {
			const pixels: Pixel[][] = get().figures;
			return pixels.flat();
		},

		pushFigure(figure: Pixel[]) {
			get().setFigures([...get().figures, figure]);
			get().setPixels([...get().pixels, ...figure]);
		},

		cleanFigures() {
			get().setFigures([]);
			get().setPixels([]);
		},

		setFigures(figures: Pixel[][]) {
			set((state): IFiguresStore => ({ ...state, figures }));
		},

		setPixels(pixels: Pixel[]) {
			set((state): IFiguresStore => ({ ...state, pixels }));
		},
	}),
);
