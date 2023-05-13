import { type FC } from 'react';
import { Text } from '@chakra-ui/react';

export const Info: FC = () => {
	return (
		<div>
			<Text>Create line: left click</Text>
			<Text>Create rectangle: middle click</Text>
		</div>
	);
};
