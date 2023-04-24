import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { SimpleGrid, Stack, type ToastId, useToast } from '@chakra-ui/react';

import { ColorPicker, InputRadio, SubmitButton } from 'shared/components';
import { chakraColorToRGBA, onPromise } from 'shared/lib';

import { EFillFigureMethod } from '../model';
import { useFiguresStore } from '../store';
import { fillFigure } from '../lib/fill-figure';

interface IFormFillFigure {
	method: EFillFigureMethod;
	color: string;
}

export const FormFillFigure: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IFormFillFigure>();

	const figures = useFiguresStore((state) => state.figures);
	const pushPixels = useFiguresStore((state) => state.pushPixels);
	const toast = useToast();

	function showToast(time: number): ToastId {
		return toast({
			title: 'The fill is complete.',
			description: `time: ${time.toFixed(3)}ms`,
			status: 'success',
			duration: 9000,
			isClosable: true,
		});
	}

	const onAction: SubmitHandler<IFormFillFigure> = async (data): Promise<void> => {
		const color = chakraColorToRGBA(data.color);
		if (!color) throw new Error('Invalid color');
		for (const figure of figures) {
			const time = performance.now();
			const pixels = fillFigure(figure, color);
			showToast(performance.now() - time);

			if (data.method === EFillFigureMethod.WithDelay) {
				for (const pixelLine of pixels) {
					await (async function (): Promise<void> {
						pushPixels(pixelLine);
					})();
					await new Promise((resolve) => setTimeout(resolve, 1));
				}
			} else {
				pushPixels(pixels.flat());
			}
		}
	};

	return (
		<form onSubmit={onPromise(handleSubmit(onAction))}>
			<SimpleGrid
				m='auto'
				maxW={'fit-content'}
				columns={[1, null, 2]}
				spacing={4}
			>
				<Stack spacing={2}>
					<ColorPicker {...{ setValue, register, errors, name: 'color' }} />
				</Stack>
				<InputRadio {...{ register, errors, name: 'method', choices: EFillFigureMethod }} />
				<SubmitButton>Draw</SubmitButton>
			</SimpleGrid>
		</form>
	);
};
