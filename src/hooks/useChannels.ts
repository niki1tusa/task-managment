import { useQuery } from '@tanstack/react-query';

import type { TChannelRow } from '@/components/pages/messages/channel/channel.types';

import { getClientChannels } from '@/services/channel/channel-client.service';

export function useChannels() {
	const {
		data: channels,
		isLoading,
		isError,
		error,
	} = useQuery<TChannelRow[]>({
		queryKey: ['channels'],
		queryFn: async () => await getClientChannels(),
	});
	return { channels, isLoadingChannels: isLoading, isErrorChannels: isError, errorChannels: error };
}
