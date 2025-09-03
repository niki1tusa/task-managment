'use client';

import { createClient } from '@/utils/supabase/client';
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
    return data 
}
// update
export async function updateProfile(updateFields: any) {
    const client = createClient();
        const {
        data: { user },
        error: authError,
    } = await client.auth.getUser();
    if (authError || !user) throw new Error(authError?.message || 'User not found');
    const { data, error } = await client.from('users').update(updateFields).eq('id', user.id)
    if (error || !data) throw new Error(error?.message || 'Profiles not found');
    return data 
}