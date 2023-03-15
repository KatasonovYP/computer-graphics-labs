import { type IPoint } from 'shared/model';

class Point {
	x: number;
	y: number;

	constructor(point: IPoint) {
		this.x = point.x;
		this.y = point.y;
	}

	public getPoint(): IPoint {
		return { x: this.x, y: this.y };
	}

	public eq(other: Point): boolean {
		return this.x === other.x && this.y === other.y;
	}

	public compare(other: Point): number {
		if (this.x === other.x) {
			return this.y - other.y;
		}
		return this.x - other.x;
	}

	public move(dx: number, dy: number): Point {
		this.x += dx;
		this.y += dy;
		return this;
	}

	public rotate(center: Point, angle: number): Point {
		const radians = (angle * Math.PI) / 180;
		const rCos = Math.cos(radians);
		const rSin = Math.sin(radians);

		const oldX = this.x;
		const oldY = this.y;

		this.x = +(oldX - center.x) * rCos + (oldY - center.y) * rSin + center.x;
		this.y = -(oldX - center.x) * rSin + (oldY - center.y) * rCos + center.y;

		return this;
	}

	// eslint-disable-next-line max-params
	public scale(center: Point, kx: number, ky: number): Point {
		this.x = (this.x - center.x) * kx + center.x;
		this.y = (this.y - center.y) * ky + center.y;
		return this;
	}

	public findInArray(points: Point[]): boolean {
		for (const other of points) {
			if (this.eq(other)) return true;
		}
		return false;
	}
}

export default Point;
