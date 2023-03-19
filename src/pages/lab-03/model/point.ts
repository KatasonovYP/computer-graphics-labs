export interface IPoint {
	x: number;
	y: number;
	new: (x: number, y: number) => IPoint;
	init: (x: number, y: number) => IPoint;
	eq: (target: IPoint) => boolean;
	link: (target: IPoint) => IPoint;
}

export const Point: IPoint = {
	x: 0,
	y: 0,
	new(x: number, y: number) {
		return Object.create(Point).init(x, y);
	},
	init(x: number, y: number) {
		this.x = x;
		this.y = y;
		return this;
	},
	eq(target: IPoint) {
		return this.x === target.x && this.y === target.y;
	},
	link(target: IPoint) {
		Object.setPrototypeOf(target, Point);
		return target;
	},
};
