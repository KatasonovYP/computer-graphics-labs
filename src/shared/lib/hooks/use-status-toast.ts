import { type ToastId, useToast } from '@chakra-ui/react';

interface StatusToasts {
	showSuccessToast: (description: string) => ToastId;
	showErrorToast: (description: string) => ToastId;
}

export function useStatusToast(): StatusToasts {
	const toast = useToast();

	function showSuccessToast(description: string): ToastId {
		return toast({
			title: 'The fill is complete.',
			description,
			status: 'success',
			duration: 9000,
			isClosable: true,
		});
	}

	function showErrorToast(description: string): ToastId {
		return toast({
			title: 'The fill is not complete.',
			description,
			status: 'error',
			duration: 9000,
			isClosable: true,
		});
	}

	return {
		showSuccessToast,
		showErrorToast,
	};
}
