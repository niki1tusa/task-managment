'use client';

import { useRouter } from 'next/navigation';

import { MENU } from '@/shared/data/sidebar/menu.data';
import { PROJECTS_MENU } from '@/shared/data/sidebar/projects.menu.data';

import { Menu } from './menu/Menu';
import { Profile } from './profile/Profile';
import { ProjectsMenu } from './project/ProjectsMenu';

export const Sidebar = ({ data }: { data: any }) => {
	const menus = MENU;
	const projectMenus = PROJECTS_MENU;

	return (
		<aside className='fixed mt-4 ml-8 h-full flex-col items-start gap-y-5 lg:flex lg:px-5'>
			<Profile data={data} />
			<Menu heading='Menu' menu={menus} isBorderTop={true} />
			<ProjectsMenu heading='Projects' menu={projectMenus} isBorderTop={true} />
		</aside>
	);
};
