import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { produce } from 'immer';

import { type IPosition } from 'shared/model';

import { type ILine, type IRectangle } from '../model';

interface State {
	rectangle: IRectangle | null;
	lines: ILine[];
	cuts: ILine[];
	pivot: IPosition | null;
}

interface Actions {
	addLine: (line: ILine) => void;
	setRectangle: (rectangle: IRectangle) => void;
	addCut: (line: ILine) => void;
	setPivot: (pivot: IPosition | null) => void;
	clearCuts: () => void;
	clear: () => void;
}

type IStore = State & Actions;

export const useShapesStore = create(
	immer<IStore>((set, get): IStore => {
		return {
			lines: [],
			cuts: [],
			rectangle: null,
			pivot: null,

			addLine(line: ILine): void {
				set(
					produce((state) => {
						state.lines.push(line);
					}),
				);
			},

			addCut(line: ILine): void {
				set(
					produce((state) => {
						state.cuts.push(line);
					}),
				);
			},

			setRectangle(rectangle: IRectangle): void {
				set({ rectangle });
			},

			setPivot(pivot: IPosition | null): void {
				set({ pivot });
			},

			clearCuts(): void {
				set({ cuts: [] });
			},

			clear(): void {
				set({ lines: [], rectangle: null, cuts: [], pivot: null });
			},
		};
	}),
);
