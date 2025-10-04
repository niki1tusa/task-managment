'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { Sidebar } from '@/components/sidebar/Sidebar';
import Chat from '@/components/ui/chat/Chat';
import { DASHBOARD_PAGES } from '@/components/ui/config/dashboard-page.config';

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isDashboard = pathname === DASHBOARD_PAGES.DASHBOARD;
	const isMessage = pathname === DASHBOARD_PAGES.MESSAGES;
	return (
		<div
			className={clsx(
				'grid',
				isDashboard
					? 'grid-cols-[12%_68%_20%]'
					: isMessage
						? 'grid-cols-[12%_38%_50%]'
						: 'grid-cols-[12%_88%]'
			)}
		>
			<aside
				className='bg-side sticky top-0 h-[100dvh] overflow-y-auto'
				role='navigation'
				aria-label='Main navigation'
			>
				<Sidebar />
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
					<Chat />
				</aside>
			)}
		</div>
	);
}
