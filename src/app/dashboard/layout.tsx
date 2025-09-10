import { redirect } from 'next/navigation';

import { PUBLIC_PAGES } from '@/config/public-page.config';

import { getServerAuth } from '@/utils/supabase/get-server-auth';

import DashboardClientLayout from './DashboardClientLayout';
import { getServerProfile } from '@/services/profile/profile-server.service';

interface Props {
	children: React.ReactNode;
}
export default async function DashboardLayout({ children }: Props) {
	const user = await getServerAuth();
	if (!user) {
		redirect(PUBLIC_PAGES.LOGIN);
	}
	return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
