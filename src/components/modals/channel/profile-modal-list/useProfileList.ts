import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { TChannelParticipantsRow } from '@/components/pages/messages/channel/channel.types';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { useChannelStore } from '@/store/channel.store';
import { useModalStore } from '@/store/modals.store';

import { getChannelParticipantsById } from '@/services/channel/channel-client.service';
import { getAllProfile } from '@/services/profile/profile-client.service';

export function useProfileList(profile: TProfileRow) {
	const { type } = useModalStore();
	const { activeChannel } = useChannelStore();
 const channelId = activeChannel?.id; 
	const [selectProfileIds, setSelectProfileIds] = useState<string[]>([]);
	const [nameChannel, setNameChannel] = useState('');
	// profiles
	const { data: profilesData } = useQuery<TProfileRow[]>({
		queryKey: ['profiles/all'],
		queryFn: () => getAllProfile(),
	});
	// channel_participants
	const { data: participants = [] } = useQuery<TChannelParticipantsRow[]>({
		queryKey: ['participants/all', channelId],
		enabled: !!channelId,
		queryFn: () => getChannelParticipantsById(channelId!),
		placeholderData: [],
	});
	// create channel
	const isAddProfileModal = type === 'insertProfileInChannel';
	const participantIds = new Set(
		participants.flatMap(p => p.profile ?? []).map(pr => pr.id)
	);
	const profiles = (profilesData ?? []).filter(
		item => isAddProfileModal?  item.id !== profile?.id &&  !participantIds.has(item.id) : item.id !== profile?.id
	);
	return {
		nameChannel,
		setNameChannel,
		selectProfileIds,
        setSelectProfileIds,
		type,
		profiles,
		profilesData,
		participantIds,
	};
}
