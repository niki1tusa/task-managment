import AddProfileInChannel from '@/components/modals/messages-page/add.profile.modal';
import { CreateChannelModal } from '@/components/modals/messages-page/create.channel.modal';
import DeleteChannelModal from '@/components/modals/messages-page/delete.channel.modal';
import DeleteProfileFromPartyChannel from '@/components/modals/messages-page/delete.profile.modal';
import RenameChannel from '@/components/modals/messages-page/rename.channel.modal';

import { CreateSubtaskModal } from '@/components/modals/task/create.subtask.modal';
import { CreateTaskModal } from '@/components/modals/task/create.task.modal';
import DeleteConfirmModals from '@/components/modals/task/delete.task.modal';
import { UpdateTaskModal } from '@/components/modals/task/update.task.modal';

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
