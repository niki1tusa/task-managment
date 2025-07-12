'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { MENU } from '@/shared/data/menu.data';
import { PROFILE } from '@/shared/data/profile.data';
import { PROJECTS_MENU } from '@/shared/data/projects.menu.data';

import { useAuthStore } from '@/store/auth.store';

import { Menu } from './menu/Menu';
import { Profile } from './profile/Profile';
import { ProjectsMenu } from './project/ProjectsMenu';

export const Sidebar = () => {
	const { logout } = useAuthStore();
	const router = useRouter();
	const handleLogout = () => {
		logout();
		router.replace('/');
	};
	return (
		<aside className='bg-side hidden h-full flex-col items-start gap-y-5 px-6 pt-4 lg:flex lg:px-5'>
			<Profile data={PROFILE} />
			<Menu heading='Menu' menu={MENU} isBorderTop={true} />
			<ProjectsMenu heading='Projects' menu={PROJECTS_MENU} isBorderTop={true} />
			<button
				onClick={handleLogout}
				className='text-gray mt-5 flex items-center justify-between gap-2 font-medium'
			>
				<LogOut /> Logout
			</button>
		</aside>
	);
};
