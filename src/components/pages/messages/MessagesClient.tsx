'use client';

import { useQuery } from '@tanstack/react-query';

import ChannelsSide from './channel/ChannelsSide';
import { getClientChannels } from '@/services/channel/channel-client.service';

export function MessagesClient() {
	const { data: channels, isLoading } = useQuery({
		queryKey: ['channels'],
		queryFn: async () => await getClientChannels(),
	});
	return (
		<div className='grid h-[100dvh] w-full overflow-hidden border-l-2 bg-gray-50 dark:bg-gray-900'>
			<ChannelsSide channels={channels || []} isLoading={isLoading} />
		</div>
	);
}
