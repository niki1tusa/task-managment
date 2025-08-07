'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { createClient } from '@/utils/supabase/client';

export default function CallbackClient() {
	const router = useRouter();

	useEffect(() => {
		const supabase = createClient();

		supabase.auth.getSession().then(({ data: { session }, error }) => {
			if (error || !session) {
				console.error('Error getting session:', error?.message);
				router.replace('/login');
			} else {
				router.replace('/dashboard');
			}
		});
	}, [router]);

	return <p className='text-black'>Signing in...</p>;
}
