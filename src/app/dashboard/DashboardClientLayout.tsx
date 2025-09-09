'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { Sidebar } from '@/components/sidebar/Sidebar';
import Chat from '@/components/ui/chat/Chat';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

interface Props {
	data: TProfileRow;
	children: React.ReactNode;
}
export default function DashboardClientLayout({ data, children }: Props) {
	const pathname = usePathname();
	const isDashboard = pathname === DASHBOARD_PAGES.DASHBOARD;
	const isMessage = pathname === DASHBOARD_PAGES.MESSAGES;
	return (
		<div
			className={clsx('grid', isDashboard ? 'grid-cols-[12%_68%_20%]' : isMessage ?  'grid-cols-[12%_38%_50%]': 'grid-cols-[12%_88%]')}
		>
			<aside
				className='bg-side sticky top-0 overflow-y-auto h-[100dvh]'
				role='navigation'
				aria-label='Main navigation'
			>
				<Sidebar data={data} />
			</aside>
			<main
				className={clsx('flex-1 dark:border-r dark:border-l dark:border-neutral-800')}
				role='main'
				aria-label='Dashboard content'
			>
				{children}
			</main>
			{(isDashboard || isMessage) && (
				<aside className='sticky top-0 h-[100dvh] shadow shadow-neutral-400'>
					<Chat profile={data} />
				</aside>
			)}
		</div>
	);
}
