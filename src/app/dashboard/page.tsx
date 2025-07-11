import type { Metadata } from 'next';

import DashboardPageClient from '../dashboardClient';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function DashboardPage() {
	return <DashboardPageClient />;
}
