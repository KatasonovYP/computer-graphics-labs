import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import * as React from 'react';

const LabMenuList = () => {
	return (
		<Menu>
			<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
				Actions
			</MenuButton>
			<MenuList>
				<MenuItem as={Link} to={'lab-02'}>
					lab 01
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
