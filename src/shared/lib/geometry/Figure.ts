import { type IPoint } from '@shared/model/geometry-types';

import Point from './Point';

class Figure {
	points: Point[];
	pivot: Point;

	constructor(pivot: IPoint, points: IPoint[]) {
		this.points = points.map((point) => new Point(point));
		this.pivot = new Point(pivot);
	}

	public getPoints(): IPoint[] {
		const points: Array<{ x: number; y: number }> = [];
		for (const p of this.points) {
			points.push({ x: p.x, y: p.y });
		}
		return points;
	}

	public eq(other: Figure): boolean {
		if (!this.pivot.eq(other.pivot)) return false;
		for (let i = 0; i < this.points.length; ++i) {
			if (!this.points[i].eq(other.points[i])) {
				return false;
			}
		}
		return true;
	}

	public move(dx: number, dy: number): Figure {
		this.pivot.move(dx, dy);
		this.points.map((point) => point.move(dx, dy));
		return this;
	}

	public rotate(angle: number): Figure {
		this.points.map((point) => point.rotate(this.pivot, angle));
		return this;
	}

	public scale(kx: number, ky: number): Figure {
		this.points.map((point) => point.scale(this.pivot, kx, ky));
		return this;
	}
}

export default Figure;
