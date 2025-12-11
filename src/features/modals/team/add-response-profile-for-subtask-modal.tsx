import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useModalStore } from '@/shared/store/modals-store';
import { useSubTaskStore } from '@/shared/store/subtask-store';
import Modal from '@/shared/ui/modal/Modal';

import { useProfile } from '@/entities/profile/use-profile';
import { addProfileForSubtask } from '@/entities/task/api/subtask-service';
import TeamModalProfileListForSubtask from '@/widgets/team/TeamModalProfileListForSubtask';

interface Props {
	close: () => void;
}

export default function AddProfileForSubTask({ close }: Props) {
	const queryClient = useQueryClient();
	const { type } = useModalStore();
	const { profile } = useProfile();
	const { activeSubTask } = useSubTaskStore();
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
				<TeamModalProfileListForSubtask
					close={close}
					profile={profile}
					mutateFnc={id => mutate({ subTaskId: activeSubTask.id, profileId: id })}
					isPending={isPending}
				/>
			</div>
		</Modal>
	);
}
