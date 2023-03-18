import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

export const LabMenuList: FC = () => {
	return (
		<Menu>
			<MenuButton
				as={Button}
				rightIcon={<ChevronDownIcon />}
			>
				Choose lab
			</MenuButton>
			<MenuList>
				<MenuItem
					disabled
					as={Link}
					to={'lab-01'}
				>
					lab 01
				</MenuItem>

				<MenuItem
					as={Link}
					to={'lab-02'}
				>
					lab 02
				</MenuItem>

				<MenuItem
					as={Link}
					to={'lab-03'}
				>
					lab 03
				</MenuItem>

				<MenuItem
					disabled
					as={Link}
					to={'lab-04'}
				>
					lab 04
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
