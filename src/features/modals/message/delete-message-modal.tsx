import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useModalStore } from '@/shared/store/modals-store';
import { Button } from '@/shared/ui/buttons/Button';
import Modal from '@/shared/ui/modal/Modal';

import { deleteMessage } from '@/features/messages/message-client-service';

interface Props {
	close: () => void;
	id: string;
}
export default function DeleteMessage({ close, id }: Props) {
	const { type } = useModalStore();

	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) => deleteMessage(id),
		onSuccess: () => {
			toast.success('Message is success deleted!');
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'deleteMessage' || !id) return null;

	return (
		<Modal close={close} title={`Do you really want to delete this message?`}>
			<Button onClick={() => mutate(id)} disabled={isPending}>
				Yes
			</Button>
			<Button onClick={close}>No</Button>
		</Modal>
	);
}
