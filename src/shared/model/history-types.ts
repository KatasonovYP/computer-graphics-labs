export enum EAction {
	MOVE,
	ROTATE,
	SCALE,
	PIVOT,
}

export type IFrame =
	| { action: EAction.MOVE; dx: number; dy: number }
	| { action: EAction.ROTATE; angle: number }
	| { action: EAction.SCALE; kx: number; ky: number }
	| { action: EAction.PIVOT; x: number; y: number };
