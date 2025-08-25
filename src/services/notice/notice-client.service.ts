import { createClient } from '@/utils/supabase/client';


// READ
export async function getNoticesByProfileId(profileId: string) {
	const client = createClient();
	const { data, error } = await client.from('notice').select('*').eq('profile_id', profileId);
    if (error) throw new Error('Notice is fail, notice-client-service-ts');
    return data
}
// UPDATE
// export async function updateStatusNotice(id: string) {
// 	const client = createClient();
// 	const { data, error } = await client.from('notice').updarte('*').eq('profile_id', id);
//     if (error) throw new Error('Notice is fail, notice-client-service-ts');
//     return data
// }