import type { Metadata } from 'next';

import NotificationClient from '@/pages/NotificationClient';

export const metadata: Metadata = {
	title: 'Notifications',
};

export default function Page() {
	return <NotificationClient />;
}
