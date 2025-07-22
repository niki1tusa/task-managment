import { createClient } from '@/utils/supabase/client';

export async function signInWithEmail({ email }: { email: string }) {
	const supabase = createClient();
	return supabase.auth.signInWithOtp({
		email: email,
		options: {
			shouldCreateUser: true,
		},
	});
}
