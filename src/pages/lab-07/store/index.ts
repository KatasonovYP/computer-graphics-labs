import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { produce } from 'immer';

import { type ILine, type IRectangle } from '../model';

interface State {
	rectangle: IRectangle | null;
	lines: ILine[];
	cuts: ILine[];
}

interface Actions {
	addLine: (line: ILine) => void;
	setRectangle: (rectangle: IRectangle) => void;
	addCut: (line: ILine) => void;
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

			clearCuts(): void {
				set({ cuts: [] });
			},

			clear(): void {
				set({ lines: [], rectangle: null, cuts: [] });
			},
		};
	}),
);
