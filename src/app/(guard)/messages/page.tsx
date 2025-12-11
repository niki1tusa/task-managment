import type { Metadata } from 'next';

import { MessagesClient } from '../../../widgets/components/pages/messages/MessagesClient';

export const metadata: Metadata = {
	title: 'Messages',
};

export default async function MessagesPage() {
	return <MessagesClient />;
}
