'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { createClient } from '@/utils/supabase/client';

export default function CallbackClient() {
	const router = useRouter();
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const next = url.searchParams.get('next') || '/dashboard';
	useEffect(() => {
		const supabase = createClient();

		supabase.auth.getSession().then(({ data: { session }, error }) => {
			if (error || !session) {
				console.error('Error getting session:', error?.message);
				router.replace('/login');
			} else {
				router.replace(next);
			}
		});
	}, [router]);

	return <p className='text-black'>Signing in...</p>;
}
