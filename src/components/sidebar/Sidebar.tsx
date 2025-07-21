'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { PROFILE } from '@/shared/data/profile.data';

import { PUBLIC_PAGES } from '@/config/public-page.config';

import { useGlobalStore } from '@/store/global.store';

import { createClient } from '@/utils/supabase/client';

import { Menu } from './menu/Menu';
import { Profile } from './profile/Profile';
import { ProjectsMenu } from './project/ProjectsMenu';

export const Sidebar = () => {
	const { menus, projectMenus } = useGlobalStore();

	const router = useRouter();

	async function signOut() {
		const { error } = await createClient().auth.signOut();

		if (!error) {
			router.push(PUBLIC_PAGES.LOGIN);
		}
	}

	return (
		<aside className='bg-side hidden h-full flex-col items-start gap-y-5 px-6 pt-4 lg:flex lg:px-5'>
			<Profile data={PROFILE} />
			<Menu heading='Menu' menu={menus} isBorderTop={true} />
			<ProjectsMenu heading='Projects' menu={projectMenus} isBorderTop={true} />
			<button
				onClick={signOut}
				className='text-gray mt-5 flex items-center justify-between gap-2 font-medium'
			>
				<LogOut /> Logout
			</button>
		</aside>
	);
};
