import { CreateCalendarEvent } from '@/components/pages/schedule/create-calendar-event.modal';

import AddProfileInChannel from '@/components/modals/channel/add.profile.modal';
import { CreateChannelModal } from '@/components/modals/channel/create.channel.modal';
import DeleteChannelModal from '@/components/modals/channel/delete.channel.modal';
import DeleteProfileFromPartyChannel from '@/components/modals/channel/delete.profile.modal';
import RenameChannel from '@/components/modals/channel/rename.channel.modal';
import DeleteMessage from '@/components/modals/message/delete.message.modal';
import UpdateMessage from '@/components/modals/message/update.message.modal';
import { CreateSubtaskModal } from '@/components/modals/task/create.subtask.modal';
import { CreateTaskModal } from '@/components/modals/task/create.task.modal';
import DeleteConfirmModals from '@/components/modals/task/delete.task.modal';
import { UpdateTaskModal } from '@/components/modals/task/update.task.modal';
import AddProfileForSubTask from '@/components/modals/team/add.response-profile-subtask';
import AddProfileInTask from '@/components/modals/team/add.task-participants';
import DeleteProfileFromTaskParticipants from '@/components/modals/team/delete.profile-for-task-participants';
import DeleteTeamResponseProfileModal from '@/components/modals/team/delete.response-profile-for-subtask';

import { useModalStore } from '@/store/modals.store';

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
