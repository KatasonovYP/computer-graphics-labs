import { type FC, useState } from 'react';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';

import { Rect } from 'react-konva';

import { Grid } from '../../entities';

import { dda } from './lib/logic/dda';
import { type IPoint, Point } from './model';

export const Lab03: FC = () => {
	const a: IPoint = Object.create(Point);
	const b: IPoint = Object.create(Point);

	const [points, setPoints] = useState<IPoint[]>([]);

	a.init(10, 10);
	b.init(30, 60);

	function drawHandle(): void {
		const [pointsList, steps] = dda(a, b);
		setPoints(pointsList);
		console.log(steps);
	}

	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			spacing={4}
		>
			<SimpleGrid>
				<Button onClick={drawHandle}>click me!</Button>
			</SimpleGrid>

			<Box
				border='2px'
				borderColor={'black'}
				borderRadius={'10px'}
			>
				<Grid>
					{points.map((point, key) => (
						<Rect
							key={key}
							x={point.x}
							y={point.y}
							fill={'red'}
							width={1}
							height={1}
						/>
					))}
				</Grid>
			</Box>
		</SimpleGrid>
	);
};
