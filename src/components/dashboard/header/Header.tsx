'use client';

import { Bell } from 'lucide-react';
import dynamic from 'next/dynamic';

import { Title } from '@/components/ui/Title';

import { SearchField } from './SearchField';

const DynamicToggleTheme = dynamic(
	() => import('../../ui/toggle-theme/ToggleTheme').then(mod => mod.ToggleTheme),
	{ ssr: false }
);

export const Header = () => {
	return (
		<div className='flex flex-col items-center justify-between bg-transparent pt-4 lg:flex-row'>
			<Title heading='page'>Dashboard</Title>
			<div className='flex flex-col items-center gap-2 lg:flex-row'>
				<SearchField />
				<span className='bg-background dark:bg-dark rounded-full text-center shadow shadow-neutral-400'>
					<Bell className='mx-2 my-2' />
				</span>
				<DynamicToggleTheme />
			</div>
		</div>
	);
};
