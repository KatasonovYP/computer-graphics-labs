import { type FC, type ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

interface Properties {
	children: ReactNode;
}

export const SubmitButton: FC<Properties> = ({ children }: Properties) => {
	return (
		<Button
			variant='solid'
			type='submit'
		>
			{children}
		</Button>
	);
};