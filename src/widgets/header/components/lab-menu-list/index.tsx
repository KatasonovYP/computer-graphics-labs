import { type FC } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react';

import { LabMenuItem } from '../lab-menu-item';

function getMenuItemName(target: number): string {
	return 'lab-' + ('0' + String(target)).slice(-2);
}

function getMenuItems(): JSX.Element[] {
	const result = [];
	for (let index = 1; index <= 4; ++index) {
		result.push(
			<LabMenuItem
				name={getMenuItemName(index)}
				key={index}
			/>,
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
