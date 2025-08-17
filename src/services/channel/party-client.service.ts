import { createClient } from "@/utils/supabase/client";

// delete
export async function deleteClientProfileFromPartyChannel(id: string) {
    const { error } = await createClient().from('channel_participants').delete().eq('profile_id', id);
    if (error) throw new Error(error.message);
    return;
}
