import { create } from 'zustand';

import type { SubTask } from '@/shared/model/subtask-types';

interface SubTaskState {
	activeSubTask: SubTask | null;
	setActiveSubTask: (subTask: SubTask | null) => void;
}

export const useSubTaskStore = create<SubTaskState>(set => ({
	activeSubTask: null,
	setActiveSubTask: subTask => set({ activeSubTask: subTask }),
}));
