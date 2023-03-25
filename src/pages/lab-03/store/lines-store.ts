import { create } from 'zustand';

import { type ILine } from '../model';

interface ILinesStore {
	color: string;
	lines: ILine[];

	target: ILine | undefined;
	setTarget: (target: ILine) => void;
	setTargetState: (target: ILine) => void;

	hovered: ILine | undefined;
	setMouseOver: (hovered: ILine) => void;
	setMouseLeave: (hovered: ILine) => void;

	choosing: boolean;
	setChoosing: (choosing: boolean) => void;

	push: (target: ILine) => void;
	setLines: (target: ILine[]) => void;
}

export const useLinesStore = create<ILinesStore>(
	(set, get): ILinesStore => ({
		color: '#f00',
		lines: [],
		target: undefined,
		choosing: false,
		hovered: undefined,

		push: (target) => {
			const filtered = get().lines.filter((line) => {
				const [a1, b1] = [target.firstPoint, target.secondPoint];
				const [a2, b2] = [line.firstPoint, line.secondPoint];
				const isEq = (a1.eq(a2) && b1.eq(b2)) || (a1.eq(b2) && b1.eq(a2));
				return !isEq;
			});
			get().setLines([...filtered, target]);
			console.log(get().lines);
		},

		setLines: (lines) => {
			set((state): ILinesStore => ({ ...state, lines }));
		},

		setTarget: (target) => {
			const oldTarget = get().target;
			if (oldTarget) {
				oldTarget.currentColor = oldTarget.color;
			}
			target.currentColor = '#00f';
			get().setTargetState(target);
		},

		setMouseOver: (hovered) => {
			hovered.currentColor = '#0f0';
			set((state): ILinesStore => ({ ...state, hovered }));
			get().push(hovered);
		},

		setMouseLeave: (hovered) => {
			hovered.currentColor = hovered.color;
			set((state): ILinesStore => ({ ...state, hovered: undefined }));
			get().push(hovered);
		},

		setTargetState: (target) => {
			set((state): ILinesStore => ({ ...state, target }));
		},

		setChoosing: (choosing) => {
			set((state): ILinesStore => ({ ...state, choosing }));
		},
	}),
);
