export interface IOOPoint {
	x: number;
	y: number;
	parent: unknown;
	intensity: number;
	new: (x: number, y: number) => IOOPoint;
	copy: () => IOOPoint;
	eq: (target: IOOPoint) => boolean;
	rotate: (pivot: IOOPoint, angle: number) => IOOPoint;
}

export const OOPoint: IOOPoint = {
	x: 0,
	y: 0,
	intensity: 100,
	parent: undefined,

	new(x, y) {
		const newPoint = Object.create(OOPoint);
		newPoint.x = x;
		newPoint.y = y;
		newPoint.parent = undefined;
		return newPoint;
	},

	copy() {
		const newPoint = Object.create(OOPoint);
		newPoint.x = this.x;
		newPoint.y = this.y;
		newPoint.parent = this.parent;
		newPoint.intensity = this.intensity;
		return newPoint;
	},

	eq(target: IOOPoint) {
		return this.x === target.x && this.y === target.y;
	},

	rotate(pivot, angle) {
		const radians = (angle * Math.PI) / 180;
		const rCos = Math.cos(radians);
		const rSin = Math.sin(radians);

		const oldX = this.x;
		const oldY = this.y;

		this.x = +(oldX - pivot.x) * rCos + (oldY - pivot.y) * rSin + pivot.x;
		this.y = -(oldX - pivot.x) * rSin + (oldY - pivot.y) * rCos + pivot.y;

		this.x = Math.round(this.x);
		this.y = Math.round(this.y);

		return this;
	},
};
