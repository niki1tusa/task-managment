'use client';

import { useQuery } from '@tanstack/react-query';
import { SquarePlus } from 'lucide-react';

import { Title } from '@/components/ui/Title';

import { getChannelParticipantsById } from '@/services/channel/channel-client.service';

export default function PartySide() {
	const channelId = '65bae38a-570a-4a36-8844-70b592dba87d';

	const { data: participants, isLoading } = useQuery({
		queryKey: ['channel_participants', channelId],
		queryFn: () => getChannelParticipantsById(channelId),
	});
	if (isLoading) return <p>...Loading</p>;
	return (
		<div className='w-full border-l-2'>
			<div className='mx-5 mt-7 flex items-center justify-between'>
				<Title heading='page'>Party</Title>
				<button type='button'>
					<SquarePlus />
				</button>
			</div>
			{participants?.map(({ profile }) => (
				<div key={profile.id}>{profile.name}</div>
			))}
		</div>
	);
}
