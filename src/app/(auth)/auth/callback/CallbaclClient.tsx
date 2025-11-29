'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { createClient } from '@/utils/supabase/client';

export default function CallbackClient() {
	const router = useRouter();
	const params = useSearchParams();
	const ran = useRef(false);

	useEffect(() => {
		if (ran.current) return;
		ran.current = true;
		const allParams = Object.fromEntries(params.entries());
		console.debug('[OAuth callback] query:', allParams);
		(async () => {
			const supabase = createClient();
			const code = params.get('code');
			const nextRaw = params.get('next');
			const next = nextRaw && nextRaw.startsWith('/') ? nextRaw : '/dashboard';
			const err = params.get('error') || params.get('error_description');

			if (err) return router.replace('/login?error=oauth');

			if (code) {
				const { error } = await supabase.auth.exchangeCodeForSession(code);
				if (error) return router.replace('/login?error=callback');
			}

			const {
				data: { session },
			} = await supabase.auth.getSession();
			router.replace(session ? next : '/login');
		})();
	}, [params, router]);

	return <p className='text-black'>Signing in…</p>;
}
