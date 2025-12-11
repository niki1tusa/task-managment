import { redirect } from 'next/navigation';

import { GUARD_PAGES } from '@/shared/config/guard-page-config';
import { getServerAuth } from '@/shared/lib/supabase/get-server-auth';

import AuthWrapper from '../AuthWrapper';

import { LoginClient } from '@/widgets/auth/login/LoginClient';

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
