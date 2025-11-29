'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button/Button';
import Textarea from '@/components/ui/field/Textarea';
import Modal from '@/components/ui/modal/Modal';

import type { TChatMessageRow, TChatMessageUpdate } from '@/shared/types/message-types';

import { useModalStore } from '@/store/modals-store';

import { updateMessage } from '@/services/message-client-service';

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
					<Button onClick={() => mutate({ id: message.id, text: value })} disable={isPending}>
						Save
					</Button>
					<Button onClick={close}>Close</Button>
				</div>
			</div>
		</Modal>
	);
}
