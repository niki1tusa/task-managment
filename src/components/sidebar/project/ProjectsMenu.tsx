'use client';

import { Heading } from '@/components/ui/Heading';

import { ProjectMenuItem } from './ProjectMenuItem';
import type { IProjectsMenu } from '@/shared/types/projects.menu.types';

interface Props {
	heading: string;
	menu: IProjectsMenu[];
	isBorderTop?: boolean;
}

export const ProjectsMenu = ({ heading, menu, isBorderTop = false }: Props) => {
	console.log('menus:', menu);
	return (
		<nav className='flex flex-col gap-4'>
			{isBorderTop && <span className='h-[1px] w-[80%] block bg-gray/50 mt-8' />}
			<Heading heading={heading} />
			{menu.length && menu.map(item => <ProjectMenuItem key={item.title} item={item} />)}
		</nav>
	);
};
