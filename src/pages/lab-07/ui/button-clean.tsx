import { type FC } from 'react';
import { Button } from '@chakra-ui/react';

import { useShapesStore } from '../store';

export const ButtonClean: FC = () => {
	const clear = useShapesStore((state) => state.clear);
	return (
		<Button
			onClick={clear}
			colorScheme={'red'}
		>
			Clear
		</Button>
	);
};
