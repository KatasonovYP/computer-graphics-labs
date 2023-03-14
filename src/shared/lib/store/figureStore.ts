import data from '@pages/lab-02/data/lab-02.json';
import Figure from '@shared/lib/geometry/Figure';
import { type IEdge, type IPoint } from '@shared/model/geometry-types';
import { EAction } from '@shared/model/history-types';
import { create } from 'zustand';

import historyStore from './historyStore';

export interface IFigureStore {
	points: IPoint[];
	edges: IEdge[];
	pivot: IPoint;
	move: (dx: number, dy: number) => void;
	rotate: (angle: number) => void;
	scale: (kx: number, ky: number) => void;
	setPivot: (x: number, y: number) => void;
	setMove: (dx: number, dy: number) => void;
	setRotate: (angle: number) => void;
	setScale: (kx: number, ky: number) => void;
	setPivotToState: (x: number, y: number) => void;
}

const useFigureStore = create<IFigureStore>(
	(set, get): IFigureStore => ({
		points: data.points,
		edges: data.edges,
		pivot: { x: 250, y: 250 },

		move: (dx: number, dy: number) => {
			historyStore.getState().pushFrame({ action: EAction.MOVE, dx, dy });
			get().setMove(dx, dy);
		},

		rotate: (angle: number) => {
			historyStore.getState().pushFrame({ action: EAction.ROTATE, angle });
			get().setRotate(angle);
		},

		scale: (kx: number, ky: number) => {
			historyStore.getState().pushFrame({ action: EAction.SCALE, kx, ky });
			get().setScale(kx, ky);
		},

		setPivot: (x: number, y: number) => {
			const oldPivot = get().pivot;
			historyStore.getState().pushFrame({ action: EAction.PIVOT, x: oldPivot.x, y: oldPivot.y });
			get().setPivotToState(x, y);
		},

		setMove: (dx, dy) => {
			set(
				(state): IFigureStore => ({
					...state,
					// pivot: new Point(state.pivot)
					// 	.move(kx, dy)
					// 	.getPoint(),
					points: new Figure(state.pivot, state.points).move(dx, dy).getPoints(),
				}),
			);
		},

		setRotate: (angle: number) => {
			set(
				(state): IFigureStore => ({
					...state,
					points: new Figure(state.pivot, state.points).rotate(angle).getPoints(),
				}),
			);
		},

		setScale: (kx: number, ky: number) => {
			set(
				(state): IFigureStore => ({
					...state,
					points: new Figure(state.pivot, state.points).scale(kx, ky).getPoints(),
				}),
			);
		},

		setPivotToState: (x: number, y: number) => {
			set(
				(state): IFigureStore => ({
					...state,
					pivot: { x, y },
				}),
			);
		},
	}),
);

export default useFigureStore;
