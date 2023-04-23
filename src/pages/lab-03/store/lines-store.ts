import { create } from 'zustand';

import { type IOOLine } from 'shared/model';

interface ILinesStore {
	color: string;
	lines: IOOLine[];

	spectrum: (angle: number) => void;

	target: IOOLine | undefined;
	setTarget: (target: IOOLine) => void;
	setTargetState: (target: IOOLine) => void;

	hovered: IOOLine | undefined;
	setMouseOver: (hovered: IOOLine) => void;
	setMouseLeave: (hovered: IOOLine) => void;

	choosing: boolean;
	setChoosing: (choosing: boolean) => void;

	push: (target: IOOLine) => void;
	clear: () => void;
	setLines: (target: IOOLine[]) => void;
}

export const useLinesStore = create<ILinesStore>(
	(set, get): ILinesStore => ({
		color: '#f00',
		lines: [],
		target: undefined,
		choosing: false,
		hovered: undefined,

		spectrum: (angle) => {
			const target = get().target;
			if (!target) return;
			let last = target;
			const lines: IOOLine[] = [];
			for (let index = 0; index < (360 - angle) / angle; ++index) {
				last = last.copy();
				last.rotate(angle);
				lines.push(last);
			}
			get().setLines([...get().lines, ...lines]);
		},

		push: (target) => {
			const lines = Object.values(get().lines);
			const filtered = lines.filter((line) => !line.eq(target));
			get().setLines([...filtered, target]);
		},

		clear: () => {
			get().setLines([]);
		},

		setLines: (lines) => {
			set((state): ILinesStore => ({ ...state, lines }));
		},

		setTarget: (target) => {
			const oldTarget = get().target;
			if (oldTarget) {
				oldTarget.currentColor = oldTarget.color;
			}
			// target.currentColor = '#00f';
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
