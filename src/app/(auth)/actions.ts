import { createClient } from '@/utils/supabase/client';


// sing in
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
export const signInWithGithub = async () => {
	const supabase = createClient();
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: `${window.location.origin}/auth/callback`,
		},
	});
	if (error) console.error('Github sign-in error:', error.message);
};
export const signInWithLinkedIn = async () => {
	const supabase = createClient();
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'linkedin_oidc',
		options: {
			redirectTo: `${window.location.origin}/auth/callback`,
		},
	});
	if (error) console.error('Github sign-in error:', error.message);
};
// fogot password

export async function sendResetPasswordEmail(email: string) {
  const supabase =  createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
  });
  if (error) throw error;
  return { ok: true };
}
//  sign out
export async function serverSignOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}