import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useModalStore } from '@/shared/store/modals-store';
import Modal from '@/shared/ui/modal/Modal';

import ProfileModalList from './profile-modal-list/ProfileModalList';
import { insertProfilesIntoChannel } from '@/entities/channel/party-client-service';
import { useProfile } from '@/entities/profile/use-profile';
import type { TChannelRow } from '@/widgets/channels/channel.types';

interface Props {
	close: () => void;
	activeChannel: TChannelRow;
}

export default function AddProfileInChannel({ close, activeChannel }: Props) {
	const queryClient = useQueryClient();
	const { type } = useModalStore();
	const { profile } = useProfile();

	const { mutate, isPending } = useMutation({
		mutationFn: ({ channelId, profileIds }: { channelId: string; profileIds: string[] }) =>
			insertProfilesIntoChannel(channelId, profileIds),
		onSuccess: () => {
			toast.success('Profiles have been added to the channel!');
			queryClient.invalidateQueries({ queryKey: ['channels', 'profiles'], exact: false });
			close();
		},
		onError: error => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'insertProfileInChannel' || !activeChannel || !profile) return null;

	return (
		<Modal close={close} title={`Channel "${activeChannel.name}"`}>
			<div className='flex w-full flex-col gap-5'>
				<ProfileModalList
					close={close}
					profile={profile}
					typeChannel={activeChannel.type || ''}
					mutateFnc={ids => mutate({ channelId: activeChannel.id, profileIds: ids })}
					isPending={isPending}
				/>
			</div>
		</Modal>
	);
}
