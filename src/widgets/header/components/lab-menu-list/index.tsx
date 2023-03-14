import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

const LabMenuList: FC = () => {
	return (
		<Menu>
			<MenuButton
				as={Button}
				rightIcon={<ChevronDownIcon />}
			>
				Actions
			</MenuButton>
			<MenuList>
				<MenuItem
					as={Link}
					to={'lab-02'}
				>
					lab 02
				</MenuItem>

				<MenuItem>Create a Copy</MenuItem>
				<MenuItem>Mark as Draft</MenuItem>
				<MenuItem>Delete</MenuItem>
				<MenuItem>Attend a Workshop</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default LabMenuList;
