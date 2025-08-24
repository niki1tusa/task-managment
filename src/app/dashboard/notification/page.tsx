import type { Metadata } from 'next';

import NotificationClient from '../../../components/pages/notification/NotificationClient';

export const metadata: Metadata = {
	title: 'Notifications',
};

export default function Page() {
	return <NotificationClient />;
}
