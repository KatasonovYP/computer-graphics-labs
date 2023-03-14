import { type SyntheticEvent } from 'react';
import { EPanel } from '@shared/model/ui-types';
import { create } from 'zustand';

interface IFeatureStore {
	expanded: EPanel;
	handleChange: (panel: EPanel) => (event: SyntheticEvent, isExpanded: boolean) => void;
}

const useFeatureStore = create<IFeatureStore>(
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

export default useFeatureStore;
