'use client';

import { MENU } from '@/shared/data/menu.data';
import { PROFILE } from '@/shared/data/profile.data';
import { PROJECTS_MENU } from '@/shared/data/projects.menu.data';

import { Menu } from './menu/Menu';
import { Profile } from './profile/Profile';
import { ProjectsMenu } from './project/ProjectsMenu';

export const Sidebar = () => {
	return (
		<aside className=' bg-side flex h-full gap-y-5 flex-col items-start pt-4 px-10'>
			<Profile data={PROFILE} />
			<Menu heading='Menu' menu={MENU} isBorderTop={true} />
			<ProjectsMenu heading='Projects' menu={PROJECTS_MENU} isBorderTop={true} />
		</aside>
	);
};
