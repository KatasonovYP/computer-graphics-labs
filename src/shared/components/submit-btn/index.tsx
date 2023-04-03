import { type FC, type ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

interface Properties {
	children: ReactNode;
	props?: Record<string, unknown>;
}

export const SubmitButton: FC<Properties> = ({ children, props }: Properties) => {
	return (
		<Button
			variant='outline'
			type='submit'
			colorScheme='purple'
			{...props}
		>
			{children}
		</Button>
	);
};
