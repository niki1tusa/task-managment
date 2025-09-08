import { createClient } from '@/utils/supabase/client';

export async function uploadAvatar(file: File, userID: string) {
	const client = createClient();
    const { data, error} = await client.storage.from('avatars').upload(`${userID}-${file.name}`, file, {
        cacheControl: '3600',
        upsert: true
    })
    if(error) throw new Error(error.message)
    
    const {data: urlData} = client.storage.from('avatars').getPublicUrl(`${userID}-${file.name}`)

    return urlData.publicUrl
}
