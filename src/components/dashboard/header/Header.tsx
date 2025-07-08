'use client';

import { Bell } from 'lucide-react';
import dynamic from 'next/dynamic';

import { SearchField } from './SearchField';
import { Title } from '@/components/ui/Title';

const DynamicToggleTheme = dynamic(
	() => import('../../ui/toggle-theme/ToggleTheme').then(mod => mod.ToggleTheme),
	{ ssr: false }
);

export const Header = () => {
	return (
		<div className='bg-transparent flex flex-col lg:flex-row justify-between items-center pt-4 '>
		<Title heading='page'>Dashboard</Title>	
			<div className='flex flex-col lg:flex-row gap-2 items-center '>
				<SearchField />
				<span className='text-center rounded-full bg-background dark:bg-dark shadow shadow-neutral-400'>
					<Bell className='mx-2 my-2 ' />
				</span>
				<DynamicToggleTheme />
			</div>
		</div>
	);
};
