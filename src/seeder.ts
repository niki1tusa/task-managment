'use server';

import { createAdminClient } from './utils/supabase/client';

export async function seedUsers() {
	const admin = createAdminClient();

	


  // 2) удаляем из auth
  const { error } = await admin.auth.admin.deleteUser('ec6b99ae-ec70-4544-ad90-ea0ff1aec5a7');
  if (error) throw error;
	// const users = await admin.auth.admin.listUsers();
	// for (const user of users.data.users) {
	// 	if (user.id === 'c5ff7bea-e44e-48ea-8a7c-94f46fb9b7c9') {
	// 		await supabase.auth.admin.deleteUser(user.id);
	// 	}
	// }
	// add user:
	// for (const user of profilesData) {
	// 	const { data } = await admin.auth.admin.createUser({
	// 		id: user.id,

	// 		email: user.email,

	// 		password: '123456',
	// 	});

	// }
}
