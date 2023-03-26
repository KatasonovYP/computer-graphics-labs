import { type FC } from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import { MoveForm, PivotForm, RotateForm, ScaleForm } from '../forms';

export const ShapeController: FC = () => {
	return (
		<SimpleGrid
			columns={[1, null, 2, 3]}
			spacing={4}
		>
			<MoveForm />
			<ScaleForm />
			<PivotForm />
			<RotateForm />
		</SimpleGrid>
	);
};
