import { create } from 'zustand';

import { type ILine } from '../model';

interface ILinesStore {
	color: string;
	lines: ILine[];
	push: (target: ILine) => void;
	setLines: (target: ILine[]) => void;
}

export const useLinesStore = create<ILinesStore>(
	(set, get): ILinesStore => ({
		color: '#f00',
		lines: [],

		push: (target) => {
			get().setLines([...get().lines, target]);
		},

		setLines: (lines) => {
			set(
				(state): ILinesStore => ({
					...state,
					lines,
				}),
			);
		},
	}),
);
