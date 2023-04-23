import { EDrawLineMethod, getDrawLineMethod } from 'shared/lib';

import { type IOOPoint, OOPoint } from './oo-point';

export interface IOOLine {
	firstPoint: IOOPoint;
	secondPoint: IOOPoint;
	color: string;
	currentColor: string;
	pixels: IOOPoint[];
	method: EDrawLineMethod;

	new: (a: IOOPoint, b: IOOPoint, color: string, method: EDrawLineMethod) => IOOLine;
	copy: () => IOOLine;
	eq: (target: IOOLine) => boolean;
	draw: () => void;
	rotate: (angle: number) => IOOLine;
}

export const OOLine: IOOLine = {
	firstPoint: OOPoint.new(0, 0),
	secondPoint: OOPoint.new(0, 0),
	color: '#f00',
	currentColor: '#f00',
	pixels: [OOPoint.new(0, 0)],
	method: 'DDA',

	// eslint-disable-next-line max-params
	new(a, b, color = '#f00', method = EDrawLineMethod.DDA) {
		const newLine = Object.create(OOLine);
		newLine.firstPoint = a;
		newLine.secondPoint = b;
		newLine.color = color;
		newLine.currentColor = color;
		newLine.method = method;
		newLine.draw();
		return newLine;
	},

	copy() {
		const newLine: IOOLine = Object.create(OOLine);
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
		const drawMethod = getDrawLineMethod(this.method);
		this.pixels = drawMethod(this.firstPoint, this.secondPoint);
	},

	rotate(angle) {
		this.secondPoint.rotate(this.firstPoint, angle);
		this.draw();
		return this;
	},
};
