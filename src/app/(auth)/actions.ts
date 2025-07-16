'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function signInWithEmail({ email }: { email: string }) {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithOtp({
		email: 'valid.email@supabase.io',
		options: {
			shouldCreateUser: true,
            emailRedirectTo: 'https://example.com/welcome'
		},
	});
	if (error) {
		redirect('/error');
	}
	revalidatePath('/', 'layout');
	redirect('/');
}
