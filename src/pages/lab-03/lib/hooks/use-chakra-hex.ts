import { useState } from 'react';
import { useToken } from '@chakra-ui/react';

export function useChakraHex(): [string, (newState: string) => string] {
	const [chakraColor, setChakraColor] = useState<string>('gray.500');
	const [color] = useToken('colors', [chakraColor]);

	const setChakraColorWrap = (newState: string): string => {
		setChakraColor((previousState) => {
			previousState = '';
			return previousState + newState;
		});
		return color;
	};
	return [color, setChakraColorWrap];
}
