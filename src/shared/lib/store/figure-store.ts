import { create } from 'zustand';

import { EAction, type IEdge, type IPoint } from 'shared/model';

import { Figure } from '../geometry/figure';

import data from './lab-02.json';

import { useHistoryStore } from './history-store';

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

export const useFigureStore = create<IFigureStore>(
	// eslint-disable-next-line max-lines-per-function
	(set, get): IFigureStore => ({
		points: data.points,
		edges: data.edges,
		pivot: { x: 250, y: 250 },

		move: (dx: number, dy: number) => {
			useHistoryStore.getState().pushFrame({ action: EAction.MOVE, dx, dy });
			get().setMove(dx, dy);
		},

		rotate: (angle: number) => {
			useHistoryStore.getState().pushFrame({ action: EAction.ROTATE, angle });
			get().setRotate(angle);
		},

		scale: (kx: number, ky: number) => {
			useHistoryStore.getState().pushFrame({ action: EAction.SCALE, kx, ky });
			get().setScale(kx, ky);
		},

		setPivot: (x: number, y: number) => {
			useHistoryStore.getState().pushFrame({ action: EAction.PIVOT, ...get().pivot });
			get().setPivotToState(x, y);
		},

		setMove: (dx, dy) => {
			set(
				(state): IFigureStore => ({
					...state,
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
