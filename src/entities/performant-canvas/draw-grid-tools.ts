import { type IPosition } from 'shared/model';

const GRID_SIZE = 50;

export function getNear(number_: number, step: number): number {
	return Math.ceil(number_ * (1 / step)) * step;
}

function drawLine(context: CanvasRenderingContext2D, start: IPosition, end: IPosition): void {
	context.beginPath(); // Start a new path
	context.moveTo(start.x, start.y); // Move the pen to start
	context.lineTo(end.x, end.y); // Draw a line to end
	context.stroke(); // Render the path
}

function drawGridHorizontal(context: CanvasRenderingContext2D, centerPosition: IPosition): void {
	const startY = getNear(-centerPosition.y, GRID_SIZE);
	const endY = -centerPosition.y + context.canvas.height;
	for (let stepY = startY; stepY < endY; stepY += GRID_SIZE) {
		const y = centerPosition.y + stepY;
		drawLine(context, { x: 0, y }, { x: context.canvas.width, y });
	}
}

function drawGridVertical(context: CanvasRenderingContext2D, centerPosition: IPosition): void {
	const startX = getNear(-centerPosition.x, GRID_SIZE);
	const endX = -centerPosition.x + context.canvas.width;
	for (let stepX = startX; stepX < endX; stepX += GRID_SIZE) {
		const x = centerPosition.x + stepX;
		drawLine(context, { x, y: 0 }, { x, y: context.canvas.height });
	}
}

function drawAxis(context: CanvasRenderingContext2D, centerPosition: IPosition): void {
	context.lineWidth = 1;
	context.strokeStyle = '#900';
	drawLine(context, { x: 0, y: centerPosition.y }, { x: context.canvas.width, y: centerPosition.y });
	context.lineWidth = 1;
	context.strokeStyle = '#090';
	drawLine(context, { x: centerPosition.x, y: context.canvas.height }, { x: centerPosition.x, y: 0 });
}

function drawTextHorizontal(context: CanvasRenderingContext2D, centerPosition: IPosition): void {
	context.textBaseline = 'top';
	context.textAlign = 'center';

	let y = Math.max(centerPosition.y, 0);

	if (centerPosition.y > context.canvas.height - 20) {
		y = context.canvas.height - 5;
		context.textBaseline = 'bottom';
	}

	const startX = getNear(-centerPosition.x, GRID_SIZE);
	const endX = -centerPosition.x + context.canvas.width;
	for (let stepX = startX; stepX < endX; stepX += GRID_SIZE) {
		if (stepX !== 0) {
			const x = centerPosition.x + stepX;
			context.fillText(`${stepX}`, x, y);
		}
	}
}

function drawTextVertical(context: CanvasRenderingContext2D, centerPosition: IPosition): void {
	context.textAlign = 'left';
	context.textBaseline = 'middle';
	let x = Math.max(centerPosition.x, 0);

	if (centerPosition.x > context.canvas.width - 20) {
		x = context.canvas.width - 5;
		context.textAlign = 'right';
	}

	const startY = getNear(-centerPosition.y, GRID_SIZE);
	const endY = -centerPosition.y + context.canvas.height;
	for (let stepY = startY; stepY < endY; stepY += GRID_SIZE) {
		if (stepY !== 0) {
			const y = centerPosition.y + stepY;
			context.fillText(`${stepY}`, x, y);
		}
	}
}

function drawGrid(context: CanvasRenderingContext2D, centerPosition: IPosition): void {
	context.lineWidth = 0.5;
	context.strokeStyle = '#999';
	drawGridHorizontal(context, centerPosition);
	drawGridVertical(context, centerPosition);
}

function drawText(context: CanvasRenderingContext2D, centerPosition: IPosition): void {
	context.lineWidth = 1;
	context.strokeStyle = '#000';
	drawTextHorizontal(context, centerPosition);
	drawTextVertical(context, centerPosition);
}

export function drawGridTools(context: CanvasRenderingContext2D, centerPosition: IPosition): void {
	drawGrid(context, centerPosition);
	drawAxis(context, centerPosition);
	drawText(context, centerPosition);
}
