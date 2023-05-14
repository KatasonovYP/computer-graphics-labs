import { type FC } from 'react';
import { Text } from '@chakra-ui/react';

export const Info: FC = () => {
	return (
		<div>
			<Text>Create shape: left click</Text>
			<Text>Create cutter: middle click</Text>
		</div>
	);
};
