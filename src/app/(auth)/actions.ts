'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createFromServer } from '@/utils/supabase/server';

export async function signInWithEmail({ email }: { email: string }) {
	const supabase = await createFromServer();
	const { data, error } = await supabase.auth.signInWithOtp({
		email: email,
		options: {
			shouldCreateUser: true,
			emailRedirectTo: 'http://localhost:3000',
		},
	});
	console.log('is email');
	if (error) {
	
		redirect('/error');
	}

	revalidatePath('/', 'layout');
	redirect('/');
	// return { success: true, data };
}
