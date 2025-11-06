'use client';

import Link from 'next/link';

import { Bell } from '@/components/animate-ui/icons/bell';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { Title } from '@/components/ui/Title';

import { DASHBOARD_PAGES } from '@/config/protect-page-config';

import { SearchField } from './SearchField';

export const Header = () => {
	return (
		<div className='flex flex-col items-center justify-between bg-transparent pt-4 lg:flex-row'>
			<Title heading='page'>Dashboard</Title>
			<div className='flex flex-col items-center gap-2 lg:flex-row'>
				<SearchField />
				<AnimateIcon animateOnHover>
					<Link
						href={DASHBOARD_PAGES.NOTIFICATION}
						className='bg-background dark:bg-dark rounded-full text-center shadow shadow-neutral-400'
					>
						<Bell className='mx-2 my-2' />
					</Link>
				</AnimateIcon>
			</div>
		</div>
	);
};
