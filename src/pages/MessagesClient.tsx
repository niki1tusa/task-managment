'use client';

import ChannelsSide from '@/widgets/channels/ChannelsSide';

import { useChannels } from '@/features/messages/model/use-channels';

export function MessagesClient() {
	const { channels, isLoadingChannels } = useChannels();
	return (
		<div className='grid h-[100dvh] w-full overflow-hidden border-l-2 bg-gray-50 dark:bg-gray-900'>
			<ChannelsSide channels={channels || []} isLoading={isLoadingChannels} />
		</div>
	);
}
