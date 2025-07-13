'use client';

import { Title } from '@/components/ui/Title';

import type { IProjectsMenu } from '@/shared/types/projects.menu.types';

import { ProjectMenuItem } from './ProjectMenuItem';

interface Props {
	heading: string;
	menu: IProjectsMenu[];
	isBorderTop?: boolean;
}

export const ProjectsMenu = ({ heading, menu, isBorderTop = false }: Props) => {
	return (
		<nav className='flex w-full flex-col gap-4'>
			{isBorderTop && <span className='border-gray/10 mt-8 block w-[80%] border-b-2' />}
			<Title isMenuTitle={true}>{heading}</Title>
			{menu.length && menu.map(item => <ProjectMenuItem key={item.title} item={item} />)}
		</nav>
	);
};
