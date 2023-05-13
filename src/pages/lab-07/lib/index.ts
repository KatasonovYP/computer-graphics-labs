import { type ICutter, type IFlatLine, type IFlatPoint, type IRectangle } from '../model';

function getCode(point: IFlatPoint, cutter: ICutter): string {
	let code = '';
	const x = point[0];
	const y = point[1];

	code = (x < cutter.xLeft ? '1' : '0') + code;
	code = (x > cutter.xRight ? '1' : '0') + code;
	code = (y > cutter.yDown ? '1' : '0') + code;
	code = (y < cutter.yUp ? '1' : '0') + code;

	return code;
}

export function simpleClipping(line: IFlatLine, rectangle: IRectangle): IFlatLine | null {
	const segment: [IFlatPoint, IFlatPoint] = [
		[line[0], line[1]],
		[line[2], line[3]],
	];
	const cutter: ICutter = {
		xLeft: rectangle.x,
		xRight: rectangle.x + rectangle.width,
		yDown: rectangle.y + rectangle.height,
		yUp: rectangle.y,
	};
	const firstCode = getCode([line[0], line[1]], cutter);
	const secondCode = getCode([line[2], line[3]], cutter);

	/* 'Вычисление сумм концов отрезка' */
	const firstSum = [...firstCode].reduce((sum, value) => sum + Number.parseInt(value), 0);
	const secondSum = [...secondCode].reduce((sum, value) => sum + Number.parseInt(value), 0);

	/* 'Установка признака видимости и начального значения тангенса угла наклона' */
	let isVisible = 1;
	let m = 10 ** 30;

	let finalFlag = false;
	let currentFlag = false;
	let draw: [IFlatPoint, IFlatPoint] = [
		[0, 0],
		[0, 0],
	];
	let bufDraw: IFlatPoint = [0, 0];

	/* 'Проверка полной видимости отрезка' */
	if (firstSum === 0 && secondSum === 0) {
		draw = [...segment];
		finalFlag = true;
	}

	/* 'Вычисление логического произведения кодов концов отрезка' */
	if (!finalFlag) {
		let pl = 0;
		// eslint-disable-next-line unicorn/no-for-loop
		for (let index_ = 0; index_ < firstCode.length; ++index_) {
			pl += Number.parseInt(firstCode[index_]) * Number.parseInt(secondCode[index_]);
		}

		if (pl !== 0) {
			isVisible = -1;
			finalFlag = true;
		}
	}

	let index = 0;
	/* 'Проверка видимости первого конца отрезка' */
	if (!finalFlag && firstSum === 0) {
		draw[0] = segment[0];
		bufDraw = segment[1];
		index = 2;
		currentFlag = true;
	}

	/* Проверка видимости второго конца отрезка */
	if (!finalFlag && !currentFlag && secondSum === 0) {
		draw[0] = segment[1];
		bufDraw = segment[0];
		index = 2;
		currentFlag = true;
	}
	let endFlag = false;

	if (!finalFlag) {
		while (!endFlag) {
			if (!currentFlag) {
				++index;
			}

			if (index <= 2) {
				if (!currentFlag) {
					bufDraw = segment[index - 1];
				}
				currentFlag = false;
				if (segment[0][0] !== segment[1][0]) {
					m = (segment[1][1] - segment[0][1]) / (segment[1][0] - segment[0][0]);

					// Левая сторона
					if (bufDraw[0] <= cutter.xLeft) {
						const yIntersection = m * (cutter.xLeft - bufDraw[0]) + bufDraw[1];

						if (yIntersection <= cutter.yDown && yIntersection >= cutter.yUp) {
							draw[index - 1] = [cutter.xLeft, yIntersection];
							continue;
						}
					}

					// Правая сторона
					if (bufDraw[0] >= cutter.xRight) {
						const yIntersection = m * (cutter.xRight - bufDraw[0]) + bufDraw[1];

						if (yIntersection <= cutter.yDown && yIntersection >= cutter.yUp) {
							draw[index - 1] = [cutter.xRight, yIntersection];
							continue;
						}
					}

					if (m === 0) {
						continue;
					}

					// Верхняя сторона
					if (bufDraw[1] <= cutter.yUp) {
						const xIntersection = (cutter.yUp - bufDraw[1]) / m + bufDraw[0];

						if (xIntersection >= cutter.xLeft && xIntersection <= cutter.xRight) {
							draw[index - 1] = [xIntersection, cutter.yUp];
							continue;
						}
					}

					// Нижняя сторона
					if (bufDraw[1] < cutter.yDown) {
						isVisible = -1;
						break;
					}

					const xIntersection = (cutter.yDown - bufDraw[1]) / m + bufDraw[0];

					if (xIntersection >= cutter.xLeft && xIntersection <= cutter.xRight) {
						draw[index - 1] = [xIntersection, cutter.yDown];
					} else {
						isVisible = -1;
						break;
					}
				}
			} else {
				endFlag = true;
			}
		}
	}
	console.log(draw);
	return isVisible === 1 ? [...draw[0], ...draw[1]] : null;
}
