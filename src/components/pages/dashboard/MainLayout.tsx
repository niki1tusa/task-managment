'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import Chat from '../../ui/chat/Chat';

interface Props {
	data: TProfileRow;
	children: React.ReactNode;
}
export default function MainLayout({ data, children }: Props) {
	const pathname = usePathname();
	const isShowChat = pathname !== DASHBOARD_PAGES.MESSAGES;
	return (
		<main
			className={clsx(
				'grid flex-1 dark:border-r dark:border-l dark:border-neutral-800',
				isShowChat ? 'grid-cols-[75%_25%]' : 'grid-cols-1'
			)}
			role='main'
			aria-label='Dashboard content'
		>
			{children}

			{isShowChat && (
				<aside className='sticky top-0 h-[100dvh] shadow shadow-neutral-400'>
					<Chat profile={data} />
				</aside>
			)}
		</main>
	);
}
