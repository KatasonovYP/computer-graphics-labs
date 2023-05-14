import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { produce } from 'immer';

import { type IFlatPoint, type IPolygon } from '../model';

interface State {
	shape: IPolygon;
	cutter: IPolygon;
	cutoff: IPolygon;
	isClosedShape: boolean;
	isClosedCutter: boolean;
}

interface Actions {
	addPointToShape: (point: IFlatPoint) => void;
	addPointToCutter: (point: IFlatPoint) => void;
	closeCutter: () => void;
	closeShape: () => void;
	setCutoff: (polygon: IPolygon) => void;
	clearCutter: () => void;
	clearCutoff: () => void;
	clear: () => void;
}

type IStore = State & Actions;

export const useShapesStore = create(
	immer<IStore>((set, get): IStore => {
		return {
			shape: [],
			cutter: [],
			cutoff: [],
			isClosedShape: false,
			isClosedCutter: false,

			addPointToShape(point: IFlatPoint): void {
				if (get().isClosedShape) {
					set({ isClosedShape: false, shape: [] });
				}
				set(
					produce((state: IStore) => {
						state.shape.push(point);
					}),
				);
			},

			addPointToCutter(point: IFlatPoint): void {
				if (get().isClosedCutter) {
					set({ isClosedCutter: false, cutter: [] });
				}
				set(
					produce((state: IStore) => {
						state.cutter.push(point);
					}),
				);
			},

			closeShape(): void {
				const shape = get().shape;
				if (shape.length >= 3 && !get().isClosedShape) {
					get().addPointToShape(shape[0]);
					set({ isClosedShape: true });
				} else {
					throw new Error('add more edges');
				}
			},

			closeCutter(): void {
				const cutter = get().cutter;
				if (cutter.length >= 3 && !get().isClosedCutter) {
					get().addPointToCutter(cutter[0]);
					set({ isClosedCutter: true });
				} else {
					throw new Error('add more edges');
				}
			},

			setCutoff(cutoff: IPolygon): void {
				set({ cutoff });
			},

			clearCutter(): void {
				set({ cutter: [] });
			},

			clearCutoff(): void {
				set({ cutoff: [] });
			},

			clear(): void {
				set({ shape: [], cutoff: [], cutter: [], isClosedShape: false, isClosedCutter: false });
			},
		};
	}),
);
