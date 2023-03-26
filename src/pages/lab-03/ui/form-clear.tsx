import { type FC } from 'react';
import { Button } from '@chakra-ui/react';

import { useLinesStore } from '../store/lines-store';

export const FormClear: FC = () => {
	const clear = useLinesStore((state) => state.clear);
	return (
		<Button
			colorScheme='red'
			onClick={clear}
		>
			Очистить
		</Button>
	);
};
