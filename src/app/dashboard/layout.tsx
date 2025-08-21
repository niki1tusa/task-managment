import { getServerAuth } from '@/utils/supabase/get-server-auth';

import DashboardClientLayout from './DashboardClientLayout';
import { getServerProfile } from '@/services/profile/profile-server.service';

interface Props {
	children: React.ReactNode;
}
export default async function DashboardLayout({ children }: Props) {
	// pure ssr
	await getServerAuth(true);
	const data = await getServerProfile();
	if (!data) return null;
	return <DashboardClientLayout data={data}>{children}</DashboardClientLayout>;
}
