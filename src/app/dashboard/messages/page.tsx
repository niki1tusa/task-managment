import type { Metadata } from 'next';

import { MessagesClient } from './MessagesClient';
import { getServerProfile } from '@/services/profile/profile-server.service';

export const metadata: Metadata = {
	title: 'Messages',
};
const channels = [
	{
		title: 'Generel',
	},
	{
		title: 'Accounting',
	},
	{
		title: 'Mark Zuckerberg',
	},
];
export default async function MessagesPage() {
	const data = await getServerProfile();
  
	if (!data) return null;
	return <MessagesClient data={data} channels={channels} />;
}
