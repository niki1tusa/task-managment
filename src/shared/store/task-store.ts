import { create } from 'zustand';

import type { Task } from '@/shared/model/task-types';

interface TaskState {
	activeTask: Task | null;
	setActiveTask: (task: Task | null) => void;
}

export const useTaskStore = create<TaskState>(set => ({
	activeTask: null,
	setActiveTask: task => set({ activeTask: task }),
}));
