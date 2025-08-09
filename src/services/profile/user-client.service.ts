'use client';

import type { TRegistrationForm } from '@/shared/types/form/scheme.zod';

import { createClient } from '@/utils/supabase/client';

export async function fetchCreateUser(fields: TRegistrationForm) {
	const client = createClient();
// TODO: сделать проверку на существующего пользователя и у меня не создается profile, хотя user создаётся
	// Регистрация в Supabase Auth
	const { data: authData, error: authError } = await client.auth.signUp({
		email: fields.email,
		password: fields.password,
	});
	if (authError || !authData?.user) {
		throw new Error(authError?.message || 'Не удалось зарегистрировать пользователя');
	}

	// Создание профиля
	const { error: profileError } = await client.from('profile').insert({
		id: authData.user.id, // важно! id должен совпадать с auth.uid()
		name: fields.name,
		avatar_path: null,
	});

	if (profileError) {
		throw new Error(profileError.message || 'Ошибка при создании профиля');
	}

	return authData.user;
}
