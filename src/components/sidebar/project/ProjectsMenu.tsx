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
	return (
		<nav className='flex flex-col w-full gap-4'>
			{isBorderTop && <span className='border-b-2 w-[80%] block border-gray/50 mt-8' />}
			<Heading heading={heading} />
			{menu.length && menu.map(item => <ProjectMenuItem key={item.title} item={item} />)}
		</nav>
	);
};
