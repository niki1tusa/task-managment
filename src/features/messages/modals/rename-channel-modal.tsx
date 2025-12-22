import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { useModalStore } from '@/shared/store/modals-store';
import { Button } from '@/shared/ui/buttons/Button';
import Textarea from '@/shared/ui/fields/Textarea';
import Modal from '@/shared/ui/modal/Modal';

import { renameChannel } from '@/entities/channel/channel-client-service';
import type { TChannelRow, TChannelUpdate } from '@/widgets/channels/channel.types';

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
					<Button onClick={() => mutate({ ...activeChannel, name: value })} disabled={isPending}>
						Save
					</Button>
					<Button onClick={close}>No</Button>
				</div>
			</div>
		</Modal>
	);
}
