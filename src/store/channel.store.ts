import type { TChannelRow } from '@/components/pages/messages/channel/channel.types';
import { create } from 'zustand';


interface ChannelState {
	activeChannel: TChannelRow | null;
	setActiveChannel: (channel: TChannelRow | null) => void;
}

export const useChannelStore = create<ChannelState>(set => ({
	activeChannel: null,
	setActiveChannel: channel => set({ activeChannel: channel }),
}));
