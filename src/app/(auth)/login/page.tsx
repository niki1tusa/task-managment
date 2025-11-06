import { redirect } from 'next/navigation';

import { LoginClient } from '@/components/auth/login/LoginClient';

import { DASHBOARD_PAGES } from '@/config/protect-page-config';

import { getServerAuth } from '@/utils/supabase/get-server-auth';

import AuthWrapper from '../AuthWrapper';

export default async function LoginPage() {
	const user = await getServerAuth();
	if (user) {
		redirect(DASHBOARD_PAGES.DASHBOARD);
	}
	return (
		<AuthWrapper>
			<LoginClient />
		</AuthWrapper>
	);
}
