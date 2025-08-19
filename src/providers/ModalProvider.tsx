import AddProfileInChannel from '@/app/dashboard/messages/modal/add.profile.modal';
import { CreateChannelModal } from '@/app/dashboard/messages/modal/create.channel.modal';
import DeleteChannelModal from '@/app/dashboard/messages/modal/delete.channel.modal';
import DeleteProfileFromPartyChannel from '@/app/dashboard/messages/modal/delete.profile.modal';
import RenameChannel from '@/app/dashboard/messages/modal/rename.channel.modal';

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
		return <CreateTaskModal close={close} />;
	}
	if (type === 'createSubTask') {
		return <CreateSubtaskModal id={payload} close={close} />;
	}
	if (type === 'updateTask') {
		return <UpdateTaskModal id={payload} close={close} />;
	}
	if (type === 'deleteChannel') {
		return <DeleteChannelModal {...payload} close={close} />;
	}
	if (type === 'deleteProfileFromPartyChannel') {
		return <DeleteProfileFromPartyChannel profile={payload} close={close} />;
	}
	if (type === 'renameChannel') {
		return <RenameChannel activeChannel={payload} close={close} />;
	}
		if (type === 'insertProfileInChannel') {
		return <AddProfileInChannel activeChannel={payload} close={close} />;
	}
	return null;
};
