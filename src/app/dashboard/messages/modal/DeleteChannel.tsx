import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';

import { useModalStore } from '@/store/modals.store';

import { deleteClientChannel } from '@/services/channel/channel-client.service';

export default function DeleteChannelModal() {
	const { close, type, payload } = useModalStore();

	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) => deleteClientChannel(id),
		onSuccess: () => {
			toast.success('Channel deleted!');
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'deleteChannel' || !payload) return null;

	return (
		<Modal close={close} title={`Do you really want to delete the channel "${payload.name}"?`}>
			<Button onClick={() => mutate(payload.id)} disable={isPending}>
				Yes
			</Button>
			<Button onClick={close}>No</Button>
		</Modal>
	);
}
