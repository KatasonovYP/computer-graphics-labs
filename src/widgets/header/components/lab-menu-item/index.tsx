import { type FC } from 'react';
import { MenuItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Properties {
	name: string;
	key: number;
}

export const LabMenuItem: FC<Properties> = ({ name, key }) => {
	return (
		<MenuItem
			as={Link}
			to={`./${name}`}
			key={key}
		>
			{name}
		</MenuItem>
	);
};
