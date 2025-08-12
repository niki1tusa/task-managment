import { create } from 'zustand';

type ModalType =
	| 'deleteTask'
	| 'createChannel'
	| 'createTask'
	| 'createSubTask'
	| 'updateTask'
	| 'deleteChannel'
	| null;

interface ModalState {
	type: ModalType;
	payload?: any;
	open: (type: ModalType, payload?: any) => void;
	close: () => void;
}

export const useModalStore = create<ModalState>(set => ({
	type: null,
	payload: undefined,
	open: (type, payload) => set({ type, payload }),
	close: () => set({ type: null, payload: undefined }),
}));
