'use client';

import { useQuery } from '@tanstack/react-query';
import { SquarePlus, Trash2Icon } from 'lucide-react';

import { Avatar } from '@/components/ui/Avatar';
import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';

import type { TChannelRow } from './channel.types';
import { getChannelParticipantsById } from '@/services/channel/channel-client.service';

type TProfile = {
	id: string;
	name: string;
	avatar_path: string | null;
	email: string;
};

// Type for the participant data structure returned by Supabase
type TChannelParticipant = {
	role: string;
	profile: TProfile[];
};
export default function PartySide({ channel }: { channel: TChannelRow }) {
	const channelId = channel?.id;

	const { data: participants, isLoading } = useQuery<TChannelParticipant[]>({
		queryKey: ['channel_participants', channelId],
		queryFn: () => getChannelParticipantsById(channelId),
		enabled: !!channelId,
	});

	return (
		<div className=' border-l-2'>
			<div className='mx-5 mt-7 mb-1 flex items-center justify-between'>
				<Title heading='page'>Party</Title>
				<button type='button'>
					<SquarePlus />
				</button>
			</div>
			<div className='border-b-2' />
			<div className='flex flex-col gap-1 overflow-y-auto py-2'>
				{isLoading ? (
					<Skeleton width='w-[97%]' length={1} />
				) : (
					participants
						?.map(p => p.profile)
						.flat()
						.map(profile => (
							<button
								key={profile.id}
								className='group max-w-[200px] flex items-center justify-between gap-2 px-5 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
							>
								<div className='flex  items-center gap-2 '>
									<Avatar img={profile.avatar_path || ''} />
									<span className='group-hover:text-primary  truncate transition-colors'>
										{profile.name}
									</span>
								</div>
								<Trash2Icon size={20} className='text-red-500' />
							</button>
						))
				)}
			</div>
		</div>
	);
}
