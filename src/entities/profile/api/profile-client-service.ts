'use client';

import { createClient } from '@/shared/lib/supabase/client';
import type { TSettingsForm } from '@/shared/model/scheme';

// select
export async function getProfile() {
	const client = createClient();
	const {
		data: { user },
		error: authError,
	} = await client.auth.getUser();
	if (authError || !user) throw new Error(authError?.message || 'User not found');

	const { data, error } = await client.from('profile').select('*').eq('id', user.id).single();
	if (error || !data) throw new Error(error?.message || 'Profile not found');

	return { ...user, ...data };
}

export async function getAllProfile() {
	const client = createClient();
	const { data, error } = await client.from('profile').select('*');
	if (error || !data) throw new Error(error?.message || 'Profiles not found');
	return data;
}
// update
export async function updateProfile(updateFields: Partial<TSettingsForm>) {
	const client = createClient();

	const {
		data: { user },
		error: authError,
	} = await client.auth.getUser();
	if (authError || !user) throw new Error(authError?.message || 'User not found');

	const { data, error } = await client
		.from('profile')
		.update(updateFields)
		.eq('id', user.id)
		.select()
		.single();
	if (error || !data) throw new Error(error?.message || 'Profiles not found');

	return data;
}
