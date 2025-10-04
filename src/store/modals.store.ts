import { create } from 'zustand';

type ModalType =
	| 'deleteTask'
	| 'createChannel'
	| 'createTask'
	| 'createSubTask'
	| 'updateTask'
	| 'deleteChannel'
	| 'deleteProfileFromPartyChannel'
	| 'renameChannel'
	| 'insertProfileInChannel'
	| 'deleteMessage'
	| 'updateMessage'
	| 'createCalendarEvent'
	| 'insertTaskParticipants'
	| 'deleteProfileFromTaskParticipants'
	| 'addResponseProfileForSubTask'
	| 'removeResponseProfileForSubTask'
	| null;
interface ModalState {
	type: ModalType;
	payload?: unknown;
	open: (type: ModalType, payload?: unknown) => void;
	close: () => void;
}

export const useModalStore = create<ModalState>(set => ({
	type: null,
	payload: undefined,
	open: (type, payload) => set({ type, payload }),
	close: () => set({ type: null, payload: undefined }),
}));
