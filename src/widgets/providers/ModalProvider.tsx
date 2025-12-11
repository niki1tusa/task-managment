import { useModalStore } from '@/shared/store/modals-store';

import AddProfileInChannel from '@/features/messages/modals/add-profile-in-channel-modal';
import { CreateChannelModal } from '@/features/messages/modals/create-channel-modal';
import DeleteChannelModal from '@/features/messages/modals/delete-channel-modal';
import DeleteProfileFromPartyChannel from '@/features/messages/modals/delete-profile-modal';
import RenameChannel from '@/features/messages/modals/rename-channel-modal';
import DeleteMessage from '@/features/modals/message/delete-message-modal';
import UpdateMessage from '@/features/modals/message/update-message-modal';
import { CreateCalendarEvent } from '@/features/modals/schedule/create-calendar-event-modal';
import { CreateSubtaskModal } from '@/features/modals/task/create-subtask-modal';
import { CreateTaskModal } from '@/features/modals/task/create-task-modal';
import DeleteConfirmModals from '@/features/modals/task/delete-task-modal';
import { UpdateTaskModal } from '@/features/modals/task/update-task-modal';
import AddProfileForSubTask from '@/features/modals/team/add-response-profile-for-subtask-modal';
import AddProfileInTask from '@/features/modals/team/add-task-participants-modal';
import DeleteProfileFromTaskParticipants from '@/features/modals/team/delete-profile-for-task-participants-modal';
import DeleteTeamResponseProfileModal from '@/features/modals/team/delete-response-profile-for-subtask-modal';

export const ModalProvider = () => {
	const { type, payload, close } = useModalStore();
	if (!type) return null;

	switch (type) {
		case 'createChannel':
			return <CreateChannelModal close={close} />;
		case 'deleteTask':
			return <DeleteConfirmModals {...payload} close={close} />;
		case 'createTask':
			return <CreateTaskModal close={close} />;
		case 'createSubTask':
			return <CreateSubtaskModal id={payload} close={close} />;
		case 'updateTask':
			return <UpdateTaskModal id={payload.id} close={close} />;
		case 'deleteChannel':
			return <DeleteChannelModal {...payload} close={close} />;
		case 'deleteProfileFromPartyChannel':
			return <DeleteProfileFromPartyChannel profile={payload} close={close} />;
		case 'renameChannel':
			return <RenameChannel activeChannel={payload} close={close} />;
		case 'insertProfileInChannel':
			return <AddProfileInChannel activeChannel={payload} close={close} />;
		case 'deleteMessage':
			return <DeleteMessage id={payload} close={close} />;
		case 'updateMessage':
			return <UpdateMessage message={payload} close={close} />;
		case 'createCalendarEvent':
			return <CreateCalendarEvent {...payload} close={close} />;
		case 'insertTaskParticipants':
			return <AddProfileInTask {...payload} close={close} />;
		case 'deleteProfileFromTaskParticipants':
			return <DeleteProfileFromTaskParticipants profile={payload} close={close} />;
		case 'addResponseProfileForSubTask':
			return <AddProfileForSubTask {...payload} close={close} />;
		case 'removeResponseProfileForSubTask':
			return <DeleteTeamResponseProfileModal subtask={payload} close={close} />;
		default:
			return null;
	}
};
