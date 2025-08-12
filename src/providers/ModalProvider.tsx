import { CreateChannelModal } from '@/app/dashboard/messages/modal/CreateChannelModal';
import DeleteChannelModal from '@/app/dashboard/messages/modal/DeleteChannel';

import DeleteConfirmModals from '@/components/modals/DeleteConfirmModals';
import { CreateSubtaskModal } from '@/components/modals/add-sub-task/CreateSubtaskModal';
import { CreateTaskModal } from '@/components/modals/add-task/CreateTaskModal';
import { UpdateTaskModal } from '@/components/modals/edit-task/UpdateTaskModal';

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
		return <CreateTaskModal {...payload} close={close} />;
	}
	if (type === 'createSubTask') {
		return <CreateSubtaskModal {...payload} close={close} />;
	}
	if (type === 'updateTask') {
		return <UpdateTaskModal {...payload} close={close} />;
	}
		if (type === 'deleteChannel') {
		return <DeleteChannelModal {...payload} close={close} />;
	}

	return null;
};
