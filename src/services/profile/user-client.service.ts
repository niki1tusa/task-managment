'use client';

import type { TRegistrationForm } from '@/shared/types/form/scheme.zod';

import { createClient } from '@/utils/supabase/client';

export async function fetchCreateUser(fields: TRegistrationForm) {
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
		},
	});
	if (authError || !authData?.user) {
		throw new Error(authError?.message || 'Не удалось зарегистрировать пользователя');
	}

	return authData.user;
}
