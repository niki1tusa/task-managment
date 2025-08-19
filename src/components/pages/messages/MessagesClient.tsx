'use client';

import { useQuery } from '@tanstack/react-query';

import Skeleton from '@/components/ui/Skeleton';

import type { TProfileRow } from '@/shared/types/task/task.types';

import Chat from '../../ui/chat/Chat';

import ChannelsSide from './channel/ChannelsSide';
import { getClientChannels } from '@/services/channel/channel-client.service';

interface Props {
	profile: TProfileRow;
}
export function MessagesClient({ profile }: Props) {
	const { data: channels, isLoading } = useQuery({
		queryKey: ['channels'],
		queryFn: async () => await getClientChannels(),
	});
	return (
		<div className='grid w-full grid-cols-[3fr_5fr] border-l-2 bg-gray-50 dark:bg-gray-900'>
			{/* Channel */}
			<ChannelsSide channels={channels || []} isLoading={isLoading} />
			{/* Chat */}
			<aside className='sticky top-0 h-[100dvh] overflow-y-auto'>
				<Chat profile={profile} />
			</aside>
		</div>
	);
}
