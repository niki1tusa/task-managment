import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/Button';

import { useModalStore } from '@/store/modals.store';

import Modal from '../../ui/modal/Modal';

import { deleteClientTask } from '@/services/tasks/task-client.service';

export default function DeleteConfirmModals() {
	const { close, type, payload } = useModalStore();

	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) => deleteClientTask(id),
		onSuccess: () => {
			toast.success('Task deleted!');
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'deleteTask' || !payload) return null;

	return (
		<Modal close={close} title='Do you really want to delete the task?'>
			<Button onClick={() => mutate(payload.id)} disable={isPending}>
				Yes
			</Button>
			<Button onClick={close}>No</Button>
		</Modal>
	);
}
