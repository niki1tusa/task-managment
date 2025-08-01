import Chat from '@/components/chat/Chat';
import { Sidebar } from '@/components/sidebar/Sidebar';

import { getServerAuth } from '@/utils/supabase/get-server-auth';

interface Props {
	children: React.ReactNode;
	modals: React.ReactNode;
}
export default async function DashboardLayout({ children, modals }: Props) {
	// pure ssr
	await getServerAuth(true);

	//
	return (
		<div className='grid grid-cols-[15%_65%_20%] h-screen'>
			<div className='bg-side'>
				<Sidebar />
			</div>
			<main className='h-[100%] flex-1 dark:border-r dark:border-l dark:border-neutral-800'>
				{modals} {children}
			</main>
			<div className='bg-chat shadow shadow-neutral-400'>
				<Chat />
			</div>
		</div>
	);
}
