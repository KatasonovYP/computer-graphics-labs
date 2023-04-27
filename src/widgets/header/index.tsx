import { type FC } from 'react';
import { Box, Stack } from '@chakra-ui/react';

import { LabMenuList } from './ui/lab-menu-list';
import { Logo } from './ui/logo';

export const Header: FC = () => {
	return (
		<header>
			<Stack
				direction='row'
				spacing='8px'
				align='center'
				justify='space-around'
			>
				<Box>
					<Logo />
				</Box>
				<Box>
					<LabMenuList />
				</Box>
			</Stack>
		</header>
	);
};
