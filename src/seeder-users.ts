'use server';

import { PROFILES } from './shared/data/profile.data';
import { createAdminClient } from './utils/supabase/client';

export async function seedUsers() {
	const supabase = createAdminClient();
	// const users = await supabase.auth.admin.listUsers()
	// console.log('existing users:', users.data.users)
	// for(const user of users.data.users){
	//     await supabase.auth.admin.deleteUser(user.id)
	// }
	for (const user of PROFILES) {
		const { data } = await supabase.auth.admin.createUser({
			id: user.id,
			email: user.email,
			password: '123456',
		});
		console.log('seed', data);
	}
}
