import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { produce } from 'immer';

import { type IFlatPoint, type ILine, type IPolygon } from '../model';
import { IPosition } from 'shared/model';

interface State {
	polygon: IPolygon;
	lines: ILine[];
	cuts: ILine[];
	isClosed: boolean;
	pivot: IPosition | null;
}

interface Actions {
	addLine: (line: ILine) => void;
	setPolygon: (polygon: IPolygon) => void;
	addPointToPolygon: (point: IFlatPoint) => void;
	closePolygon: () => void;
	addCut: (line: ILine) => void;
	setPivot: (pivot: IPosition) => void;
	clearCuts: () => void;
	clear: () => void;
}

type IStore = State & Actions;

export const useShapesStore = create(
	immer<IStore>((set, get): IStore => {
		return {
			lines: [],
			cuts: [],
			polygon: [],
			isClosed: false,
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
					produce((state: IStore) => {
						state.cuts.push(line);
					}),
				);
			},

			addPointToPolygon(point: IFlatPoint): void {
				if (get().isClosed) {
					get().setPolygon([]);
					set({ isClosed: false });
				}
				set(
					produce((state: IStore) => {
						state.polygon.push(point);
					}),
				);
			},

			closePolygon(): void {
				const polygon = get().polygon;
				if (polygon.length >= 3 && !get().isClosed) {
					get().addPointToPolygon(get().polygon[0]);
					set({ isClosed: true });
				} else {
					throw new Error('add more edges');
				}
			},

			setPolygon(polygon: IPolygon): void {
				set({ polygon });
			},

			setPivot(pivot: IPosition): void {
				set({ pivot });
			},

			clearCuts(): void {
				set({ cuts: [] });
			},

			clear(): void {
				set({ lines: [], polygon: [], cuts: [], isClosed: false });
			},
		};
	}),
);
