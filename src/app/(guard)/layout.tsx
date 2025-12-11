'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { Sidebar } from '@/widgets/sidebar/Sidebar';

import { GUARD_PAGES } from '@/shared/config/guard-page-config';

import Chat from '@/widgets/chat/ui/Chat';

export default function GuardLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isDashboard = pathname === GUARD_PAGES.DASHBOARD;
	const isMessage = pathname === GUARD_PAGES.MESSAGES;
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
			<main className='flex-1' role='main' aria-label='Dashboard content'>
				{children}
			</main>
			{(isDashboard || isMessage) && (
				<aside className='shadow-default border-gray/30 sticky top-0 h-[100dvh] border-l'>
					<Chat />
				</aside>
			)}
		</div>
	);
}
