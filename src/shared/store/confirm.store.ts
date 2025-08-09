import { create } from 'zustand';

import type { TTask } from '@/shared/types/task/task.types';

interface ConfirmState {
	isOpen: boolean;
	task: TTask | null;
	open: (task: TTask) => void;
	close: () => void;
}

export const useConfirmStore = create<ConfirmState>(set => ({
	isOpen: false,
	task: null,
	open: task => set({ isOpen: true, task }),
	close: () => set({ isOpen: false, task: null }),
}));
