import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import type { ProfileRow } from '@/shared/model/task-types';
import { useChannelStore } from '@/shared/store/channel-store';
import { useModalStore } from '@/shared/store/modals-store';

import {
	getChannelParticipantsById,
	getMyDirectPartnerIds,
} from '@/entities/channel/channel-client-service';
import { getAllProfile } from '@/entities/profile/api/profile-client-service';
import type { TChannelParticipantsRow } from '@/widgets/channels/channel.types';

export function useProfileList(profile: ProfileRow) {
	const { type } = useModalStore();
	const { activeChannel } = useChannelStore();

	const channelId = activeChannel?.id;
	const [selectProfileIds, setSelectProfileIds] = useState<string[]>([]);
	const [nameChannel, setNameChannel] = useState('');
	// profiles
	const { data: profilesData } = useQuery<ProfileRow[]>({
		queryKey: ['profiles'],
		queryFn: () => getAllProfile(),
	});
	// channel_participants
	const { data: participants = [] } = useQuery<TChannelParticipantsRow[]>({
		queryKey: ['participants', channelId],
		enabled: !!channelId,
		queryFn: () => getChannelParticipantsById(channelId!),
		placeholderData: [],
	});

	const { data: partnerIds = [] } = useQuery({
		queryKey: ['direct-partners', profile.id],
		queryFn: () => getMyDirectPartnerIds(profile.id),
		staleTime: 60_000,
	});
	// create channel
	const isAddProfileModal = type === 'insertProfileInChannel';
	const participantIds = useMemo(
		() => new Set(participants.flatMap(p => p.profile ?? []).map(pr => pr.id)),
		[participants]
	);
	const partnerSet = useMemo(() => new Set(partnerIds), [partnerIds]);

	const profiles = useMemo(() => {
		const base = profilesData ?? [];
		return base.filter(
			u =>
				u.id !== profile.id && // себя исключаем всегда
				(!isAddProfileModal || !participantIds.has(u.id)) && // если добавляем в канал — исключаем уже участников активного канала
				!partnerSet.has(u.id) // и исключаем тех, с кем уже есть direct
		);
	}, [profilesData, profile.id, isAddProfileModal, participantIds, partnerSet]);
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
