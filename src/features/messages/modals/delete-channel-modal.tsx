import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useModalStore } from '@/shared/store/modals-store';
import { Button } from '@/shared/ui/buttons/Button';
import Modal from '@/shared/ui/modal/Modal';

import { deleteClientChannel } from '@/entities/channel/channel-client-service';

interface Props {
	close: () => void;
}
export default function DeleteChannelModal({ close }: Props) {
	const { type, payload } = useModalStore();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) => deleteClientChannel(id),
		onSuccess: () => {
			toast.success('Channel deleted!');
			queryClient.invalidateQueries({ queryKey: ['channels'], exact: false });
			close();
		},
		onError: error => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'deleteChannel' || !payload) return null;

	return (
		<Modal close={close} title={`Do you really want to delete the channel "${payload.name}"?`}>
			<Button onClick={() => mutate(payload.id)} disabled={isPending}>
				Yes
			</Button>
			<Button onClick={close}>No</Button>
		</Modal>
	);
}
