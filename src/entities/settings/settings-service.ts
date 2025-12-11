import { createClient } from '@/shared/lib/supabase/client';

// storage
export async function uploadAvatar(file: File, userID: string) {
	const client = createClient();
	const { error } = await client.storage.from('avatars').upload(`${userID}/avatar.png`, file, {
		cacheControl: '3600',
		upsert: true,
	});
	if (error) throw new Error(error.message);

	const { data: urlData } = client.storage.from('avatars').getPublicUrl(`${userID}/avatar.png`);

	return `${urlData.publicUrl}?v=${Date.now()}`;
}
// update
export async function updateAvatarPathInProfile(avatarPath: string) {
	const client = createClient();
	const {
		data: { user },
		error: authErr,
	} = await client.auth.getUser();
	if (authErr || !user) throw new Error(authErr?.message || 'User not found');

	const { data, error } = await client
		.from('profile')
		.update({ avatar_path: avatarPath })
		.eq('id', user?.id)
		.select()
		.single();
	if (error || !data) throw new Error(error?.message);
	return data;
}
// delete
export async function deleteAvatarPathInProfile() {
	const client = createClient();
	const {
		data: { user },
		error: authErr,
	} = await client.auth.getUser();
	if (authErr || !user) throw new Error(authErr?.message || 'User not found');

	const { data, error } = await client
		.from('profile')
		.update({ avatar_path: null })
		.eq('id', user?.id)
		.select()
		.single();
	if (error || !data) throw new Error(error?.message);
	return data;
}
