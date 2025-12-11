import { create } from 'zustand';

import type { TSubTaskRow } from '@/shared/model/subtask-types';

interface SubTaskState {
	activeSubTask: TSubTaskRow | null;
	setActiveSubTask: (subTask: TSubTaskRow | null) => void;
}

export const useSubTaskStore = create<SubTaskState>(set => ({
	activeSubTask: null,
	setActiveSubTask: subTask => set({ activeSubTask: subTask }),
}));
