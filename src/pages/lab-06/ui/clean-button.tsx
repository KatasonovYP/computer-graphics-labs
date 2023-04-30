import { type FC } from 'react';
import { Button } from '@chakra-ui/react';

import { useFiguresStore } from '../store';

export const CleanButton: FC = () => {
	const clear = useFiguresStore((state) => state.clear);
	return (
		<Button
			onClick={clear}
			colorScheme={'red'}
		>
			Clear
		</Button>
	);
};
