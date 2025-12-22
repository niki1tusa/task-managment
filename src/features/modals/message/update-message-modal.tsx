'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { useModalStore } from '@/shared/store/modals-store';
import { Button } from '@/shared/ui/buttons/Button';
import Textarea from '@/shared/ui/fields/Textarea';
import Modal from '@/shared/ui/modal/Modal';

import { updateMessage } from '@/features/messages/message-client-service';
import type { TChatMessageRow, TChatMessageUpdate } from '@/features/messages/model/message-types';

interface Props {
	close: () => void;
	message: TChatMessageRow;
}
export default function UpdateMessage({ close, message }: Props) {
	const { type } = useModalStore();
	const [value, setValue] = useState<string>(message.text);
	const { mutate, isPending } = useMutation({
		mutationFn: (payload: TChatMessageUpdate) => updateMessage(payload),
		onSuccess: () => {
			toast.success('Message is success edit!');
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'updateMessage' || !message) return null;

	return (
		<Modal close={close} title={`Edit message.`}>
			<div className='flex flex-col'>
				<Textarea value={value} setValue={setValue} className='h-auto' isStretch={true} />

				<div className='flex gap-4 py-4'>
					<Button onClick={() => mutate({ id: message.id, text: value })} disabled={isPending}>
						Save
					</Button>
					<Button onClick={close}>Close</Button>
				</div>
			</div>
		</Modal>
	);
}
