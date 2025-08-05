'use client';

import type { IProjectsMenu } from '@/shared/types/sidebar/menu.item.types';

export const ProjectMenuItem = ({ item }: { item: IProjectsMenu }) => {
	return (
		<div className='text-gray hover:bg-primary flex items-center gap-1.5 rounded-4xl px-3 py-1 text-sm font-semibold hover:text-white 2xl:text-lg'>
			{item.color && <div className={`h-3 w-3 ${item.color}`} />}

			<div>{item.title}</div>
		</div>
	);
};
