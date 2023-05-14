import { type FC } from 'react';

import { Button } from '@chakra-ui/react';

import { useCut } from '../hooks/use-cut';

export const ButtonCut: FC = () => {
	const { cutLinesHandler } = useCut();
	return (
		<Button
			onClick={cutLinesHandler}
			colorScheme={'blue'}
		>
			Cut
		</Button>
	);
};
