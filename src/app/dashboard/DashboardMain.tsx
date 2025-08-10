'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import Chat from '@/components/chat-sidebar/Chat';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

interface Props {
	data: TProfileRow;
	children: React.ReactNode;
}
export default function DashboardMain({ data, children }: Props) {
	const pathname = usePathname();
	const isShowChat = pathname !== DASHBOARD_PAGES.MESSAGES;
	return (
		<main
			className={clsx(
				'grid h-[100%] flex-1 dark:border-r dark:border-l dark:border-neutral-800',
				isShowChat ? 'grid-cols-[75%_25%]' : 'grid-cols-1'
			)}
			role='main'
			aria-label='Dashboard content'
		>
			{children}

			{isShowChat && (
				<div
					className='bg-chat text-chat-foreground h-full overflow-hidden shadow shadow-neutral-400'
					role='complementary'
					aria-label='Chat panel'
				>
					<Chat data={data} />
				</div>
			)}
		</main>
	);
}
