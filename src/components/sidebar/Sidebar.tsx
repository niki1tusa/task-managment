'use client';

import { MENU } from '@/shared/data/sidebar/menu.data';
import { PROJECTS_MENU } from '@/shared/data/sidebar/projects.menu.data';
import type { TProfileRow } from '@/shared/types/task/task.types';

import { Menu } from './menu/Menu';
import { ProfileMenu} from './profile/Profile';
import { ProjectsMenu } from './project/ProjectsMenu';
import ThemeMenu from './theme-menu/ThemeMenu';
import Logout from './Logout';

export const Sidebar = ({ data }: { data: TProfileRow }) => {
	return (
		<aside className='mt-4 ml-8 h-full flex-col items-start gap-y-5 lg:flex lg:px-5'>
			{/* <Profile data={data} /> */}
			<ProfileMenu data={data}/>
			<Menu heading='MENU' menu={MENU} isBorderTop={true} />
			<ProjectsMenu heading='PROJECTS' menu={PROJECTS_MENU} isBorderTop={true} />
			<ThemeMenu/>
			<Logout/>
		</aside>
	);
};
