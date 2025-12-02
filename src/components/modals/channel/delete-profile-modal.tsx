import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button/Button';
import Modal from '@/components/ui/modal/Modal';

import type { TProfileRow } from '@/shared/types/task-types';

import { useModalStore } from '@/store/modals-store';

import { deleteClientProfileFromPartyChannel } from '@/services/channel/party-client-service';

interface Props {
	close: () => void;
	profile: TProfileRow;
}
export default function DeleteProfileFromPartyChannel({ close, profile }: Props) {
	const { type } = useModalStore();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) => deleteClientProfileFromPartyChannel(id),
		onSuccess: () => {
			toast.success('Profile is kicked out!');
			queryClient.invalidateQueries({ queryKey: ['channel_participants'] });
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'deleteProfileFromPartyChannel' || !profile) return null;

	return (
		<Modal
			close={close}
			title={`Do you really want to kicked from party channel "${profile.name}"?`}
		>
			<Button onClick={() => mutate(profile.id)} disable={isPending}>
				Yes
			</Button>
			<Button onClick={close}>No</Button>
		</Modal>
	);
}
