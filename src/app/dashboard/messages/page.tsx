import type { Metadata } from 'next';

import { MessagesClient } from '../../../components/pages/messages/MessagesClient';

import { getServerProfile } from '@/services/profile/profile-server.service';

export const metadata: Metadata = {
	title: 'Messages',
};

export default async function MessagesPage() {
	const data = await getServerProfile();
	const profile = data;
	if (!profile) return null;
	return <MessagesClient profile={profile} />;
}
