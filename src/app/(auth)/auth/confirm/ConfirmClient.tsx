'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { GUARD_PAGES } from '@/shared/config/guard-page-config';
import { PUBLIC_PAGES } from '@/shared/config/public-page-config';
import { createClient } from '@/shared/lib/supabase/client';

export function ConfirmClient() {
	const router = useRouter();
	const params = useSearchParams();
	useEffect(() => {
		const verifyToken = async () => {
			if (!params) return;
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
	return (
		<div className='flex h-full w-full items-center justify-center text-white'>
			Verify is your email... please wait.
		</div>
	);
}
