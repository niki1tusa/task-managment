'use client';

import { Bell } from 'lucide-react';
import dynamic from 'next/dynamic';

import { SearchField } from './SearchField';

const DynamicToggleTheme = dynamic(
	() => import('../toggle-theme/ToggleTheme').then(mod => mod.ToggleTheme),
	{ ssr: false }
);

export const Header = () => {
	return (
		<div className='bg-transparent flex justify-between items-center pt-4 '>
			<div className='font-bold text-3xl '>Dashboard</div>
			<div className='flex gap-2 items-center '>
				<SearchField />
				<span className='text-center rounded-full bg-white shadow shadow-neutral-400'>
					<Bell className='text-dark mx-2 my-2 ' />
				</span>
				<DynamicToggleTheme />
			</div>
		</div>
	);
};
