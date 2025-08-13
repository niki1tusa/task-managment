'use server';

import { createAdminClient } from './utils/supabase/client';

const profilesData = [
	{
		id: 'a1b2c3d4-1111-1111-1111-000000000001',
		name: 'Иван Иванов',
		avatar_path: 'https://example.com/avatar1.png',
		email: 'user1@example.com',
		occupation: 'developer',
	},
	{
		id: 'a1b2c3d4-1111-1111-1111-000000000002',
		name: 'Мария Смирнова',
		avatar_path: 'https://example.com/avatar2.png',
		email: 'user2@example.com',
		occupation: 'designer',
	},
	{
		id: 'a1b2c3d4-1111-1111-1111-000000000003',
		name: 'Алексей Петров',
		avatar_path: 'https://example.com/avatar3.png',
		email: 'user3@example.com',
		occupation: 'manager',
	},
	{
		id: 'a1b2c3d4-1111-1111-1111-000000000004',
		name: 'Ольга Кузнецова',
		avatar_path: 'https://example.com/avatar4.png',
		email: 'user4@example.com',
		occupation: 'analyst',
	},
	{
		id: 'a1b2c3d4-1111-1111-1111-000000000005',
		name: 'Дмитрий Соколов',
		avatar_path: 'https://example.com/avatar5.png',
		email: 'user5@example.com',
		occupation: 'engineer',
	},
	{
		id: 'a1b2c3d4-1111-1111-1111-000000000006',
		name: 'Елена Васильева',
		avatar_path: 'https://example.com/avatar6.png',
		email: 'user6@example.com',
		occupation: 'teacher',
	},
	{
		id: 'a1b2c3d4-1111-1111-1111-000000000007',
		name: 'Сергей Михайлов',
		avatar_path: 'https://example.com/avatar7.png',
		email: 'user7@example.com',
		occupation: 'developer',
	},
	{
		id: 'a1b2c3d4-1111-1111-1111-000000000008',
		name: 'Наталья Федорова',
		avatar_path: 'https://example.com/avatar8.png',
		email: 'user8@example.com',
		occupation: 'artist',
	},
	{
		id: 'a1b2c3d4-1111-1111-1111-000000000009',
		name: 'Павел Новиков',
		avatar_path: 'https://example.com/avatar9.png',
		email: 'user9@example.com',
		occupation: 'consultant',
	},
	{
		id: 'a1b2c3d4-1111-1111-1111-000000000010',
		name: 'Ирина Лебедева',
		avatar_path: 'https://example.com/avatar10.png',
		email: 'user10@example.com',
		occupation: 'guest',
	},
];

export async function seedUsers() {
	const supabase = createAdminClient();

	const users = await supabase.auth.admin.listUsers();

	console.log('existing users:', users.data.users);

	for (const user of users.data.users) {
		if (
			user.id === '9155af86-1856-4cfe-814b-5fbd6ec89a27'
		) {
			await supabase.auth.admin.deleteUser(user.id);
		}
	}

	// for (const user of profilesData) {
	// 	const { data } = await supabase.auth.admin.createUser({
	// 		id: user.id,

	// 		email: user.email,

	// 		password: '123456',
	// 	});

	// }
}
