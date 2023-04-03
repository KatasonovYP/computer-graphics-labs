import { type SyntheticEvent } from 'react';

export function onPromise<T>(promise: (event: SyntheticEvent) => Promise<T>) {
	return (event: SyntheticEvent) => {
		promise(event).catch((error) => {
			// eslint-disable-next-line no-console
			console.log('Unexpected error on promise', error);
		});
	};
}
