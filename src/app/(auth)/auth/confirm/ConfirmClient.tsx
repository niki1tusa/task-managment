'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';
import { PUBLIC_PAGES } from '@/config/public-page.config';

import { createClient } from '@/utils/supabase/client';

export function ConfirmClient() {
	const router = useRouter();
	const params = useSearchParams();
	useEffect(() => {
		const verifyToken = async () => {
			const token_hash = params.get('token_hash');
			if (!token_hash) return router.replace(PUBLIC_PAGES.LOGIN);

			const { error } = await createClient().auth.verifyOtp({
				type: 'email',
				token_hash,
			});
			if (!error) return router.replace('/error');
			router.replace(DASHBOARD_PAGES.DASHBOARD);
		};
		verifyToken();
	}, []);
	return <p>Verify is your email... please wait.</p>;
}
