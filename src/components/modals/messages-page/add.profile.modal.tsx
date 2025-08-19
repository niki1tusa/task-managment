import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import type { TChannelRow } from '@/components/pages/messages/channel/channel.types';
import Modal from '@/components/ui/modal/Modal';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { useModalStore } from '@/store/modals.store';

import ProfileModalList from './profile-modal-list/ProfileModalList';
import { insertProfilesIntoChannel } from '@/services/channel/party-client.service';
import { getProfile } from '@/services/profile/profile-client.service';

interface Props {
	close: () => void;
	activeChannel: TChannelRow;
}

export default function AddProfileInChannel({ close, activeChannel }: Props) {
	const { type } = useModalStore();
	const { data: profile } = useQuery<TProfileRow>({
		queryKey: ['profiles'],
		queryFn: () => getProfile(),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: ({ channelId, profileIds }: { channelId: string; profileIds: string[] }) =>
			insertProfilesIntoChannel(channelId, profileIds),
		onSuccess: () => {
			toast.success('Profiles have been added to the channel!');
			close();
		},
		onError: (error: unknown) => {
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
