import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { type FC } from 'react';

import { lazily } from 'react-lazily';

const { ChartTime } = lazily(async () => await import('./chart-time'));

export const ModalChartTime: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen}>Compare time</Button>
			<Modal
				isCentered
				isOpen={isOpen}
				onClose={onClose}
				size={'xl'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Time compare</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<ChartTime />
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							onClick={onClose}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
