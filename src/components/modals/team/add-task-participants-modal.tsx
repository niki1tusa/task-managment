import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import Modal from '@/components/ui/modal/Modal';

import { useModalStore } from '@/store/modals-store';
import { useTaskStore } from '@/store/task-store';

import { useProfile } from '@/hooks/use-profile';

import TeamModalParticipant from '../../pages/team/TeamModalParticipant';

import { insertTaskParticipants } from '@/services/tasks/task-client-service';

interface Props {
	close: () => void;
}

export default function AddProfileInTask({ close }: Props) {
	const queryClient = useQueryClient();
	const { type } = useModalStore();
	const { profile } = useProfile();
	const { activeTask } = useTaskStore();
	const { mutate, isPending } = useMutation({
		mutationFn: ({ taskId, profileIds }: { taskId: string; profileIds: string[] }) =>
			insertTaskParticipants(taskId, profileIds),
		onSuccess: () => {
			toast.success('Profiles successfully added to the Task!');
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			queryClient.invalidateQueries({ queryKey: ['profiles'] });

			queryClient.refetchQueries({ queryKey: ['tasks'] });
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'insertTaskParticipants' || !activeTask || !profile) return null;

	return (
		<Modal close={close} title={`Task - "${activeTask.title}"`}>
			<div className='flex w-full flex-col gap-5'>
				<TeamModalParticipant
					close={close}
					profile={profile}
					mutateFnc={ids => mutate({ taskId: activeTask.id, profileIds: ids })}
					isPending={isPending}
				/>
			</div>
		</Modal>
	);
}
