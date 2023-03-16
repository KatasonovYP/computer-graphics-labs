import { type SyntheticEvent } from 'react';

import { create } from 'zustand';

import { EPanel } from 'shared/model';

interface IFeatureStore {
	expanded: EPanel;
	handleChange: (panel: EPanel) => (event: SyntheticEvent, isExpanded: boolean) => void;
}

export const useFeatureStore = create<IFeatureStore>(
	(set): IFeatureStore => ({
		expanded: EPanel.MANAGER,

		handleChange: (panel: EPanel) => (event: SyntheticEvent, isExpanded: boolean) => {
			set(
				(state): IFeatureStore => ({
					...state,
					expanded: isExpanded ? panel : EPanel.CLOSED,
				}),
			);
		},
	}),
);
