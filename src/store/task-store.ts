import { create } from 'zustand';

import type { TTask } from '@/shared/types/task.types';

interface TaskState {
	activeTask: TTask | null;
	setActiveTask: (task: TTask | null) => void;
}

export const useTaskStore = create<TaskState>(set => ({
	activeTask: null,
	setActiveTask: task => set({ activeTask: task }),
}));
