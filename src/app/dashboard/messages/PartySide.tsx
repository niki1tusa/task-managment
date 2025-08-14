'use client';

import { useQuery } from '@tanstack/react-query';
import { SquarePlus, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import { Avatar } from '@/components/ui/Avatar';
import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task/task.types';

import type { TChannelRow } from './channel.types';
import { getChannelParticipantsById } from '@/services/channel/channel-client.service';
import { getProfile } from '@/services/profile/profile-client.service';

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
	const [sortedParty, setSortedPaty] = useState<'role' | 'a-z'>('role');

	const channelId = channel?.id;
	const { data: currentProfile } = useQuery<TProfileRow>({
		queryKey: ['profile'],
		queryFn: () => getProfile(),
	});
	const { data: participants, isLoading } = useQuery<TChannelParticipant[]>({
		queryKey: ['channel_participants', channelId],
		queryFn: () => getChannelParticipantsById(channelId),
		enabled: !!channelId,
	});

	const sortedProfiles =
		sortedParty === 'role'
			? participants
					?.filter(Boolean)
					.sort((a, b) => {
						if (a.role === 'owner') return -1;
						if (b.role === 'owner') return 1;
						return 0;
					})
					.map(p => p.profile)
					.flat()
			: participants
					?.map(p => p.profile)
					.flat()
					.sort((a, b) => a.name.localeCompare(b.name));

	const ownerChannel = participants?.find(p => p.role === 'owner');
	return (
		<div className='relative border-l-2'>
			{/* Header */}
			<div className='mx-5 mt-7 mb-1 flex items-center justify-between'>
				<Title heading='page'>Party</Title>
				<button type='button'>
					<SquarePlus />
				</button>
			</div>
			<div className='border-b-2 shadow-sm' />
			<Tabs defaultValue='role' className='dark:bg-muted bg-gray w-full shadow-sm'>
				<TabsList className='grid w-full grid-cols-2 rounded-none border-b-2'>
					<TabsTrigger onClick={() => setSortedPaty('role')} value='role'>
						Role
					</TabsTrigger>
					<TabsTrigger onClick={() => setSortedPaty('a-z')} value='a-z'>
						A-Z
					</TabsTrigger>
				</TabsList>
			</Tabs>
			{/* List */}
			<div className='flex flex-col gap-1 overflow-y-auto py-2'>
				{isLoading ? (
					<Skeleton width='w-[97%]' length={1} />
				) : (
					sortedProfiles?.map(profile => (
						<div
							key={profile.id}
							className='group flex max-w-[200px] items-center justify-between gap-2 px-2 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
						>
							<div className='relative flex items-center gap-2 truncate p-1'>
								<div className='relative'>
									<Avatar img={profile.avatar_path || ''} />
									<div className='absolute top-5.5 right-0 z-50 h-2 w-2 animate-pulse rounded-full border border-green-900 bg-green-500' />
								</div>
								<span className='group-hover:text-primary relative transition-colors'>
									{profile.name}
								</span>
								{ownerChannel?.profile?.[0]?.id === profile.id && (
									<span className='ml-2 rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-semibold'>
										OWNER
									</span>
								)}
							</div>
							{!(currentProfile?.id === profile.id) && (
								<button title='Remove user from a channel' type='button'>
									<Trash2Icon
										size={18}
										className='text-red-400 opacity-0 transition-opacity group-hover:opacity-100'
									/>
								</button>
							)}
						</div>
					))
				)}
			</div>
			{/* Fade overlay */}
			<div className='from-primary/10 dark:from-gray/5 pointer-events-none absolute bottom-0 left-0 z-50 h-8 w-full bg-gradient-to-t to-transparent' />
		</div>
	);
}
