import { redirect } from 'next/navigation';

import LoginClient from '@/components/auth/LoginClient';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import { getServerAuth } from '@/utils/supabase/get-server-auth';

export default async function LoginPage() {
	const user = await getServerAuth();
	if (user) {
		redirect(DASHBOARD_PAGES.DASHBOARD);
	}
	return <LoginClient />;
}
