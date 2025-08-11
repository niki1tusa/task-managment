import { CreateChannelModal } from '@/app/dashboard/messages/CreateChannelModal';

import DeleteConfirmModals from '@/components/dashboard/modals/DeleteConfirmModals';

import { useModalStore } from '@/store/modals.store';

export const ModalProvider = () => {
	const { type, payload, close } = useModalStore();

	if (!type) return null;

	if (type === 'createChannel') {
		return <CreateChannelModal close={close} />;
	}
	if (type === 'deleteTask') {
		return <DeleteConfirmModals {...payload} close={close} />;
	}
		if (type === 'createTask') {
		return <DeleteConfirmModals {...payload} close={close} />;
	}
		if (type === 'createSubTask') {
		return <DeleteConfirmModals {...payload} close={close} />;
	}
		if (type === 'updateTask') {
		return <DeleteConfirmModals {...payload} close={close} />;
	}

	return null;
};
