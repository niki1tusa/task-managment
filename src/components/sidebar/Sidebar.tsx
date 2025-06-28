'use client';

import { MENU } from '@/data/menu.data';
import { PROFILE } from '../../data/profile.data';

import { Menu } from './menu/Menu';
import { Profile } from './profile/Profile';
import { PROJECTS_MENU } from '@/data/projects.menu.data';
import { ProjectsMenu } from './project/ProjectsMenu';

export const Sidebar = () => {
	return (
		<aside className='w-1/6 h-screen bg-white dark:bg-slate-900 flex flex-col items-start pl-10 pt-4'>
			<Profile data={PROFILE} />
			<Menu heading='Menu' menu={MENU} isBorderTop={true} />
			<ProjectsMenu heading='Projects' menu={PROJECTS_MENU} isBorderTop={true} />
		</aside>
	);
};
