import { useQuery } from '@tanstack/react-query';

import { getClientChannels } from '@/entities/channel/channel-client-service';
import type { TChannelRow } from '@/widgets/channels/channel.types';

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
