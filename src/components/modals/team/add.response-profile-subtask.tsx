import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import Modal from '@/components/ui/modal/Modal';

import { useModalStore } from '@/store/modals.store';

import { useProfile } from '@/hooks/useProfile';


import { useSubTaskStore } from '@/store/subtask.store';
import { addProfileForSubtask } from '@/services/tasks/subtask.service';
import TeamModalPofileListForSubtask from '@/components/pages/team/TeamModalPofileListForSubtask';

interface Props {
	close: () => void;
}

export default function AddProfileForSubTask({ close }: Props) {
	const queryClient = useQueryClient();
	const { type } = useModalStore();
	const { profile } = useProfile();
	const { activeSubTask} = useSubTaskStore()
	const { mutate, isPending } = useMutation({
		mutationKey: ['add-profile-subtask'],
		mutationFn: ({ subTaskId, profileId }: { subTaskId: string; profileId: string }) =>
			addProfileForSubtask(subTaskId, profileId),
		onSuccess: () => {
			toast.success('Profiles successfully added to the Task!');
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			queryClient.invalidateQueries({ queryKey: ['profiles'] }); // <-- если что этот важнее
			queryClient.refetchQueries({ queryKey: ['tasks'] });
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'addResponseProfileForSubTask' || !activeSubTask || !profile) return null;

	return (
		<Modal close={close} title={`SubTask - "${activeSubTask.title}"`}>
			<div className='flex w-full flex-col gap-5'>
				<TeamModalPofileListForSubtask
					close={close}
					profile={profile}
					mutateFnc={id => mutate({ subTaskId: activeSubTask.id, profileId: id })}
					isPending={isPending}
				/>
			</div>
		</Modal>
	);
}
