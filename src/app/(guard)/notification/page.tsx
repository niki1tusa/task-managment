import type { Metadata } from 'next';

import NotificationClient from '../../../widgets/components/pages/notification/NotificationClient';

export const metadata: Metadata = {
	title: 'Notifications',
};

export default function Page() {
	return <NotificationClient />;
}
