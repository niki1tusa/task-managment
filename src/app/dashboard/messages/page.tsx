
import type { Metadata } from 'next';

import { MessagesClient } from './MessagesClient';
import { getServerProfile } from '@/services/profile/profile-server.service';
import { getClientChannels } from '@/services/channel/channel-client.service';

export const metadata: Metadata = {
	title: 'Messages',
};

export default async function MessagesPage() {

	const data = await getServerProfile();
	const channels = await getClientChannels()
	if (!data && !channels) return null;
	return <MessagesClient data={data} channels={channels} />;
}
