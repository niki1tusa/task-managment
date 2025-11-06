import type { TSubTaskRow } from '@/shared/types/subtask/subtask.types';
import { create } from 'zustand';


interface SubTaskState {
    activeSubTask: TSubTaskRow | null;
    setActiveSubTask: (subTask: TSubTaskRow | null) => void;
}

export const useSubTaskStore = create<SubTaskState>(set => ({
    activeSubTask: null,
    setActiveSubTask: subTask => set({ activeSubTask: subTask }),
}));