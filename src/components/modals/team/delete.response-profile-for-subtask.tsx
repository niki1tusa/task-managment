import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button/Button';
import Modal from '@/components/ui/modal/Modal';

import { useModalStore } from '@/store/modals.store';

import { removeProfileForSubtask } from '@/services/tasks/subtask.service';
import type { TSubTaskRow } from '@/shared/types/subtask/subtask.types';

interface Props {
	close: () => void;
    subtask: TSubTaskRow
}
export default function DeleteTeamResponseProfileModal({ close, subtask }: Props) {
	const { type } = useModalStore();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) => removeProfileForSubtask(id),
		onSuccess: () => {
			toast.success('Remove is success!');
			queryClient.invalidateQueries({ predicate: query => query.queryKey[0] === 'tasks'});
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'anknow'}`);
		},
	});

	if (type !== 'removeResponseProfileForSubTask' || !subtask) return null;

	return (
		<Modal close={close} title={`Do you really want to remove profile with it subtask "${subtask.title}"?`}>
			<Button onClick={() => mutate(subtask.id)} disable={isPending}>
				Yes
			</Button>
			<Button onClick={close}>No</Button>
		</Modal>
	);
}
