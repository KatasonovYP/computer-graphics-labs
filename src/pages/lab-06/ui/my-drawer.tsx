import {
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { type FC, type ReactNode, useRef } from 'react';

interface Properties {
	name: string;
	children?: ReactNode;
}

export const MyDrawer: FC<Properties> = ({ name, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button
				colorScheme='blue'
				variant='outline'
				onClick={onOpen}
			>
				{name}
			</Button>
			<Drawer
				placement={'left'}
				onClose={onClose}
				isOpen={isOpen}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth='1px'>{name}</DrawerHeader>
					<DrawerBody>{children}</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};
