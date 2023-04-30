import { type FC } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function getMenuItemName(target: number): string {
	return 'lab-' + ('0' + String(target)).slice(-2);
}

function getMenuItems(): JSX.Element[] {
	const result = [];
	for (let index = 1; index <= 7; ++index) {
		const name = getMenuItemName(index);
		result.push(
			<MenuItem
				as={Link}
				to={`./${name}`}
				key={index}
			>
				{name}
			</MenuItem>,
		);
	}
	return result;
}

export const LabMenuList: FC = () => {
	return (
		<Menu>
			<MenuButton
				as={Button}
				rightIcon={<ChevronDownIcon />}
			>
				Choose lab
			</MenuButton>

			<MenuList>{getMenuItems()}</MenuList>
		</Menu>
	);
};
