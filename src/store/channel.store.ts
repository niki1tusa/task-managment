import { create } from 'zustand';

import type { TChannelRow } from '@/app/dashboard/messages/channel.types';

interface ChannelState {
	activeChannel: TChannelRow | null;
	setActiveChannel: (channel: TChannelRow | null) => void;
}

export const useChannelStore = create<ChannelState>(set => ({
	activeChannel: null,
	setActiveChannel: channel => set({ activeChannel: channel }),
}));
