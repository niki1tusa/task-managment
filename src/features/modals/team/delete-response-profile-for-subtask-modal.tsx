import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { TSubTaskRow } from '@/shared/model/subtask-types';
import { useModalStore } from '@/shared/store/modals-store';
import { Button } from '@/shared/ui/buttons/Button';
import Modal from '@/shared/ui/modal/Modal';

import { removeProfileForSubtask } from '@/entities/task/api/subtask-service';

interface Props {
	close: () => void;
	subtask: TSubTaskRow;
}
export default function DeleteTeamResponseProfileModal({ close, subtask }: Props) {
	const { type } = useModalStore();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) => removeProfileForSubtask(id),
		onSuccess: () => {
			toast.success('Remove is success!');
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'anknow'}`);
		},
	});

	if (type !== 'removeResponseProfileForSubTask' || !subtask) return null;

	return (
		<Modal
			close={close}
			title={`Do you really want to remove profile with it subtask "${subtask.title}"?`}
		>
			<Button onClick={() => mutate(subtask.id)} disable={isPending}>
				Yes
			</Button>
			<Button onClick={close}>No</Button>
		</Modal>
	);
}
