import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

import type {
	TChannelRow,
	TChannelUpdate,
} from '@/components/pages/messages/channel/channel.types';
import { Button } from '@/components/ui/button/Button';
import Textarea from '@/components/ui/field/Textarea';
import Modal from '@/components/ui/modal/Modal';

import { useModalStore } from '@/store/modals-store';

import { renameChannel } from '@/services/channel/channel-client-service';

interface Props {
	close: () => void;
	activeChannel: TChannelRow;
}
export default function RenameChannel({ close, activeChannel }: Props) {
	const { type } = useModalStore();
	const [value, setValue] = useState('');
	const { mutate, isPending } = useMutation({
		mutationFn: (payload: TChannelUpdate) => renameChannel(payload),
		onSuccess: () => {
			toast.success('Channel is rename!');
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'renameChannel' || !activeChannel) return null;

	return (
		<Modal close={close} title={`Channel "${activeChannel.name}"`}>
			<div className='flex flex-col gap-5'>
				<Textarea value={value} setValue={setValue} />
				<div className='flex gap-4'>
					<Button onClick={() => mutate({ ...activeChannel, name: value })} disable={isPending}>
						Save
					</Button>
					<Button onClick={close}>No</Button>
				</div>
			</div>
		</Modal>
	);
}
