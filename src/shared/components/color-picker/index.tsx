import { Center, Input, Popover, PopoverBody, PopoverContent } from '@chakra-ui/react';
import { type FC, useState } from 'react';

import { ColorPopoverHeader } from './ui/color-popover-header';
import { ColorPopoverTrigger } from './ui/color-popover-grigger';
import { ColorPopoverPalette } from './ui/color-popover-palette';

export const ColorPicker: FC = () => {
	const [color, setColor] = useState('gray.500');

	return (
		<Center marginTop={5}>
			<Popover variant='picker'>
				<ColorPopoverTrigger color={color} />
				<PopoverContent width='170px'>
					<ColorPopoverHeader color={color} />
					<PopoverBody height='120px'>
						<ColorPopoverPalette setColor={setColor} />
						<Input
							borderRadius={3}
							marginTop={3}
							placeholder='red.100'
							size='sm'
							value={color}
							onChange={(event) => {
								setColor(event.target.value);
							}}
						/>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Center>
	);
};
