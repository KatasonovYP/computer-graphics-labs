import { type FC } from 'react';

import { Button } from '@chakra-ui/react';

import { useParallels } from '../hooks/use-parallels';

export const ButtonAddParallels: FC = () => {
	const { addParallelsHandler } = useParallels();
	return (
		<Button
			onClick={addParallelsHandler}
			colorScheme={'blue'}
		>
			Draw Parallels
		</Button>
	);
};
