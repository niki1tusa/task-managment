import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button/Button';
import Modal from '@/components/ui/modal/Modal';

import { useModalStore } from '@/store/modals-store';

import { deleteMessage } from '@/services/message-client-service';

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
			<Button onClick={() => mutate(id)} disable={isPending}>
				Yes
			</Button>
			<Button onClick={close}>No</Button>
		</Modal>
	);
}
