import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

export const Logo: FC = () => {
	return (
		<div>
			<Text
				as={Link}
				to={'/'}
				fontSize='6xl'
			>
				CG
			</Text>
		</div>
	);
};
