import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

function Logo() {
	return (
		<div>
			<Text as={Link} to={'/'} fontSize="6xl">
				CG
			</Text>
		</div>
	);
}

export default Logo;
