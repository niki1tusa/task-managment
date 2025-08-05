'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { MENU } from '@/shared/data/sidebar/menu.data';
import { PROJECTS_MENU } from '@/shared/data/sidebar/projects.menu.data';

import { PUBLIC_PAGES } from '@/config/public-page.config';

import { createClient } from '@/utils/supabase/client';

import { Menu } from './menu/Menu';
import { Profile } from './profile/Profile';
import { ProjectsMenu } from './project/ProjectsMenu';

export const Sidebar = ({ data }: { data: any }) => {
	const menus = MENU;
	const projectMenus = PROJECTS_MENU;
	const router = useRouter();

	async function signOut() {
		const { error } = await createClient().auth.signOut();

		if (!error) {
			router.push(PUBLIC_PAGES.LOGIN);
		}
	}

	return (
		<aside className='fixed mt-4 ml-8 h-full flex-col items-start gap-y-5 lg:flex lg:px-5'>
			<Profile data={data} />
			<Menu heading='Menu' menu={menus} isBorderTop={true} />
			<ProjectsMenu heading='Projects' menu={projectMenus} isBorderTop={true} />
			<button
				onClick={signOut}
				className='text-gray mt-5 flex items-center justify-between gap-2 font-medium 2xl:text-2xl'
			>
				<LogOut /> Logout
			</button>
		</aside>
	);
};
