import { type FC } from 'react';
import { Button } from '@chakra-ui/react';

import { useFiguresStore } from '../store';

export const CleanButton: FC = () => {
	const cleanFigures = useFiguresStore((state) => state.cleanFigures);
	return (
		<Button
			onClick={cleanFigures}
			colorScheme={'red'}
		>
			Clear
		</Button>
	);
};
