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
export const signInWithGoogle = async () => {
	const supabase = createClient();
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${window.location.origin}/auth/callback`,
		},
	});
	if (error) console.error('Google sign-in error:', error.message);
};
