'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';



import { createClient } from '@/utils/supabase/client';
import { PUBLIC_PAGES } from '@/config/public-page-config';
import { GUARD_PAGES } from '@/config/guard-page-config';

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
			if (error) {
				console.log(error.message);
				router.replace('/error');
			}
			router.replace(GUARD_PAGES.DASHBOARD);
		};

		verifyToken();
	}, [params, router]);
	return <p className='text-white p-2'>Verify is your email... please wait.</p>;
}
