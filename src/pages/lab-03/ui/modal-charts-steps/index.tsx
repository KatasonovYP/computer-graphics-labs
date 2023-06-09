import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	useDisclosure,
} from '@chakra-ui/react';
import { type FC } from 'react';

import { lazily } from 'react-lazily';

import { EDrawLineMethod } from 'shared/lib';

const { ChartSteps } = lazily(async () => await import('./chart-steps'));

export const ModalChartsSteps: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen}>Compare steps</Button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={'full'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Steps compare</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<SimpleGrid
							m='auto'
							maxW={'fit-content'}
							columns={[1, null, 2, 3]}
							spacing={4}
						>
							{Object.values(EDrawLineMethod).map((method, key) => {
								if (method === EDrawLineMethod.WU) {
									return (
										<ChartSteps
											key={key}
											method={EDrawLineMethod.BRESENHAM_SMOOTH}
										/>
									);
								}
								return (
									<ChartSteps
										key={key}
										method={method}
									/>
								);
							})}
						</SimpleGrid>
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
