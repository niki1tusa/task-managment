'use client';

import { PUBLIC_PAGES } from '@/components/ui/config/public-page.config';

import type { TRegistrationForm } from '@/shared/types/form/scheme.zod';

import { createClient } from '@/utils/supabase/client';

// register user
export async function createUser(fields: TRegistrationForm) {
	const client = createClient();
	// Проверяем, есть ли профиль с таким email
	const { data: existingProfile, error: profileCheckError } = await client
		.from('profile')
		.select('id')
		.eq('email', fields.email)
		.single();

	if (profileCheckError && profileCheckError.code !== 'PGRST116') {
		// PGRST116 — это "row not found" для single()
		throw profileCheckError;
	}
	if (existingProfile) {
		throw new Error('Профиль с таким email уже существует');
	}

	const { data: authData, error: authError } = await client.auth.signUp({
		email: fields.email,
		password: fields.password,
		options: {
			data: {
				name: fields.name,
			},
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${PUBLIC_PAGES.AUTH_CALLBACK}`,
		},
	});

	if (authError || !authData?.user) {
		throw new Error(authError?.message || 'Не удалось зарегистрировать пользователя');
	}
	return authData.user;
}
// update password
export async function updateUserPassword(newPassword: string) {
	const client = createClient();
	const { data, error } = await client.auth.updateUser({ password: newPassword });
	if (error) throw new Error(error.message || 'Failed to update password');
	return data;
}

// login
export async function loginUserByPhoneAndPassword(payload: { password: string; phone: string }) {
	const client = createClient();
	const { data, error } = await client.auth.signInWithPassword({
		password: payload.password,
		phone: payload.phone,
	});
	if (error) throw new Error(error.message || 'Failed to login password');
	return data;
}
