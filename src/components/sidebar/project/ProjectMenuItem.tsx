'use client';

import type { IProjectsMenu } from '@/shared/types/projects.menu.types';

export const ProjectMenuItem = ({ item }: { item: IProjectsMenu }) => {
	return (
		<div className='flex items-center rounded-4xl gap-1.5 font-semibold text-sm 2xl:text-lg px-3 py-1 text-gray  hover:bg-primary hover:text-white'>
			{item.color && <div className={`w-3 h-3  ${item.color}`} />}

			<div>{item.title}</div>
		</div>
	);
};
