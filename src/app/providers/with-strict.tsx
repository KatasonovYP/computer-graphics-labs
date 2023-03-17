import { StrictMode } from 'react';

import type { ReactNode } from 'react';

export function withStrict(component: () => ReactNode) {
	// eslint-disable-next-line react/function-component-definition
	return function WithStrict() {
		return <StrictMode>{component()}</StrictMode>;
	};
}
