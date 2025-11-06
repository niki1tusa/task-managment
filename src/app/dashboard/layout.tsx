import { redirect } from 'next/navigation';

import { PUBLIC_PAGES } from '@/components/ui/config/public-page.config';

import { getServerAuth } from '@/utils/supabase/get-server-auth';

import DashboardClientLayout from './DashboardClientLayout';

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
