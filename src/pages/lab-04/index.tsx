import { type FC } from 'react';
import { SimpleGrid, Stack } from '@chakra-ui/react';

import { PerformantCanvas } from './ui/canvas';
import { FormCircle } from './ui/form-circle';
import { FormCircleSpectrum } from './ui/form-circle-spectrum';
import { CleanButton } from './ui/clean-button';
import { FormEllipse } from './ui/form-ellipse';
import { MyDrawer } from './ui/my-drawer';
import { FormEllipseSpectrum } from './ui/form-ellipse-spectrum';
import { ModalChartTime } from './ui/modal-charts-time';

export const Lab04: FC = () => {
	return (
		<SimpleGrid
			m='auto'
			maxW={'fit-content'}
			columns={[1, null, 2]}
			spacing={4}
		>
			<Stack spacing={4}>
				<MyDrawer name={'form circle'}>
					<FormCircle />
				</MyDrawer>
				<MyDrawer name={'form circle spectrum'}>
					<FormCircleSpectrum />
				</MyDrawer>
				<MyDrawer name={'form ellipse'}>
					<FormEllipse />
				</MyDrawer>
				<MyDrawer name={'form ellipse spectrum'}>
					<FormEllipseSpectrum />
				</MyDrawer>
				<ModalChartTime name={'circle'} />
				<ModalChartTime name={'ellipse'} />
				<CleanButton />
			</Stack>
			<PerformantCanvas />
		</SimpleGrid>
	);
};
