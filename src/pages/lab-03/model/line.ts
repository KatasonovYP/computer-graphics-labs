import { getMethod } from '../lib/logic';

import { type IPoint, Point } from './point';
import { EMethod } from './types';

export interface ILine {
	firstPoint: IPoint;
	secondPoint: IPoint;
	color: string;
	currentColor: string;
	pixels: IPoint[];
	method: EMethod;

	new: (a: IPoint, b: IPoint, color: string, method: EMethod) => ILine;
	copy: () => ILine;
	eq: (target: ILine) => boolean;
	draw: () => void;
	rotate: (angle: number) => ILine;
}

export const Line: ILine = {
	firstPoint: Point.new(0, 0),
	secondPoint: Point.new(0, 0),
	color: '#f00',
	currentColor: '#f00',
	pixels: [Point.new(0, 0)],
	method: EMethod.DDA,

	new(a, b, color = '#f00', method = EMethod.DDA) {
		const newLine = Object.create(Line);
		newLine.firstPoint = a;
		newLine.secondPoint = b;
		newLine.color = color;
		newLine.currentColor = color;
		newLine.method = method;
		newLine.draw();
		return newLine;
	},

	copy() {
		const newLine: ILine = Object.create(Line);
		newLine.firstPoint = this.firstPoint.copy();
		newLine.secondPoint = this.secondPoint.copy();
		const { color, method } = this;
		newLine.color = color;
		newLine.currentColor = color;
		newLine.method = method;
		newLine.draw();
		return newLine;
	},

	eq(target) {
		const [a1, b1] = [this.firstPoint, this.secondPoint];
		const [a2, b2] = [target.firstPoint, target.secondPoint];
		return (a1.eq(a2) && b1.eq(b2)) || (a1.eq(b2) && b1.eq(a2));
	},

	draw() {
		const drawMethod = getMethod(this.method);
		this.pixels = drawMethod(this.firstPoint, this.secondPoint);
	},

	rotate(angle) {
		this.secondPoint.rotate(this.firstPoint, angle);
		this.draw();
		return this;
	},
};
