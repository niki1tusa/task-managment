import { redirect } from 'next/navigation';

import { LoginClient } from '@/components/auth/login/LoginClient';

import { GUARD_PAGES } from '@/config/guard-page-config';

import { getServerAuth } from '@/utils/supabase/get-server-auth';

import AuthWrapper from '../AuthWrapper';

export default async function LoginPage() {
	const user = await getServerAuth();
	if (user) {
		redirect(GUARD_PAGES.DASHBOARD);
	}
	return (
		<AuthWrapper>
			<LoginClient />
		</AuthWrapper>
	);
}
