'use client';

import { MENU } from '@/shared/data/sidebar/menu.data';
import { PROJECTS_MENU } from '@/shared/data/sidebar/projects.menu.data';

import Logout from './Logout';
import { Menu } from './menu/Menu';
import { ProfileMenu } from './profile/Profile';
import { ProjectsMenu } from './project/ProjectsMenu';
import ThemeMenu from './theme-menu/ThemeMenu';

export const Sidebar = () => {
	return (
		<aside className='mt-4 h-full flex-col items-start gap-y-5 lg:flex lg:px-5 2xl:ml-8'>
			{/* <Profile data={data} /> */}
			<ProfileMenu />
			<Menu heading='MENU' menu={MENU} isBorderTop={true} />
			<ProjectsMenu heading='PROJECTS' menu={PROJECTS_MENU} isBorderTop={true} />
			<ThemeMenu />
			<Logout />
		</aside>
	);
};
