import { redirect } from 'next/navigation';

import { PUBLIC_PAGES } from '@/config/public-page.config';

import { createFromServer } from './server';

export async function getServerAuth(isNeedRedirect = false) {
	const supabase = await createFromServer();
	const { data, error } = await supabase.auth.getUser();
	if (error || !data.user) {
		return isNeedRedirect ? redirect(PUBLIC_PAGES.LOGIN) : null;
	}
	return data.user;
}
