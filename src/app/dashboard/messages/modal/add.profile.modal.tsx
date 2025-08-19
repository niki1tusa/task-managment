import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import Modal from '@/components/ui/modal/Modal';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { useModalStore } from '@/store/modals.store';

import type { TChannelRow } from '../channel/channel.types';

import ProfileList from './ProfileList';
import {  getProfile } from '@/services/profile/profile-client.service';
import { insertProfilesIntoChannel } from '@/services/channel/party-client.service';

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
			<div className='flex flex-col gap-5'>
				<ProfileList
					close={close}
					profile={profile}
					typeChannel={activeChannel.type || ''}
					mutateFnc={(ids) => mutate({ channelId: activeChannel.id, profileIds: ids })}
					isPending={isPending}
				/>
			</div>
		</Modal>
	);
}
