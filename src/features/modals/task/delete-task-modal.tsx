import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useModalStore } from '@/shared/store/modals-store';
import { Button } from '@/shared/ui/buttons/Button';
import Modal from '@/shared/ui/modal/Modal';

import { deleteClientTask } from '@/entities/task/api/task-client-service';

export default function DeleteConfirmModals() {
	const { close, type, payload } = useModalStore();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) => deleteClientTask(id),
		onSuccess: () => {
			toast.success('Task deleted!');
			queryClient.invalidateQueries({ queryKey: ['tasks'], exact: false });
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'deleteTask' || !payload) return null;

	return (
		<Modal close={close} title='Do you really want to delete the task?'>
			<Button onClick={() => mutate(payload.id)} disabled={isPending}>
				Yes
			</Button>
			<Button onClick={close}>No</Button>
		</Modal>
	);
}
