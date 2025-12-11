import { create } from 'zustand';

import type { TChannelRow } from '@/widgets/channels/channel.types';

interface ChannelState {
	activeChannel: TChannelRow | null;
	setActiveChannel: (channel: TChannelRow | null) => void;
}

export const useChannelStore = create<ChannelState>(set => ({
	activeChannel: null,
	setActiveChannel: channel => set({ activeChannel: channel }),
}));
