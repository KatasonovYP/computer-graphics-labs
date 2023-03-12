import { Box, Stack } from '@chakra-ui/react';
import Logo from './components/logo';
import LabMenuList from './components/lab-menu-list';

type Props = {};

const Header = (props: Props) => {
	return (
		<header>
			<Stack direction="row" spacing="8px" align="center" justify="space-around">
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

export default Header;
