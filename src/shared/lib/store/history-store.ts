import { create } from 'zustand';

import { EAction, type IFrame } from '../../model';

import useFigureStore from './figure-store';

interface IHistoryStore {
	history: IFrame[];
	undo: () => void;
	reverseAction: (frame: IFrame) => void;
	pushFrame: (frame: IFrame) => void;
	popFrame: () => IFrame | undefined;
}

const useHistoryStore = create<IHistoryStore>(
	// eslint-disable-next-line max-lines-per-function
	(set, get): IHistoryStore => ({
		history: [],

		undo: () => {
			const frame = get().popFrame();
			if (frame === undefined) return;
			get().reverseAction(frame);
		},

		reverseAction: (frame: IFrame) => {
			switch (frame.action) {
				case EAction.MOVE: {
					useFigureStore.getState().setMove(-frame.dx, -frame.dy);
					break;
				}
				case EAction.ROTATE: {
					useFigureStore.getState().setRotate(-frame.angle);
					break;
				}
				case EAction.SCALE: {
					useFigureStore.getState().setScale(1 / frame.kx, 1 / frame.ky);
					break;
				}
				case EAction.PIVOT: {
					useFigureStore.getState().setPivotToState(frame.x, frame.y);
					break;
				}
				default: {
					break;
				}
			}
		},

		pushFrame: (frame: IFrame) => {
			set(
				(state): IHistoryStore => ({
					...state,
					history: [...state.history, frame],
				}),
			);
		},

		popFrame: () => {
			const history = get().history;
			if (history.length === 0) {
				return;
			}
			const frame: IFrame = { ...history[history.length - 1] };
			set(
				(state): IHistoryStore => ({
					...state,
					history: state.history.slice(0, -1),
				}),
			);
			return frame;
		},
	}),
);

export default useHistoryStore;
