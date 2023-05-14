import { ToastId, useToast } from '@chakra-ui/react';

export function useErrorToast(): { showErrorToast: (error: string) => ToastId } {
	const toast = useToast();

	// function showSuccessToast(time: number): ToastId {
	// 	return toast({
	// 		title: 'The fill is complete.',
	// 		description: `time: ${time.toFixed(3)}ms`,
	// 		status: 'success',
	// 		duration: 9000,
	// 		isClosable: true,
	// 	});
	// }

	function showErrorToast(error: string): ToastId {
		return toast({
			title: 'The cut is not complete.',
			description: `${error}`,
			status: 'error',
			duration: 9000,
			isClosable: true,
			position: 'bottom-right',
		});
	}
	return { showErrorToast };
}
