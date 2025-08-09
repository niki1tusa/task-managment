import Chat from '@/components/chat-sidebar/Chat';
import { Sidebar } from '@/components/sidebar/Sidebar';

import { getServerAuth } from '@/utils/supabase/get-server-auth';

import { getServerProfile } from '@/services/profile/profile-server.service';

interface Props {
	children: React.ReactNode;
	modals: React.ReactNode;
}
export default async function DashboardLayout({ children, modals }: Props) {
	// pure ssr
	await getServerAuth(true);
	const data = await getServerProfile();
	if (!data) return null;
	return (
		<div className='grid h-screen grid-cols-[15%_65%_20%]'>
			<div className='bg-side' role='navigation' aria-label='Main navigation'>
				<Sidebar data={data} />
			</div>
			<main
				className='h-[100%] flex-1 dark:border-r dark:border-l dark:border-neutral-800'
				role='main'
				aria-label='Dashboard content'
			>
				{modals} {children}
			</main>
			<div
				className='bg-chat text-chat-foreground h-full overflow-hidden shadow shadow-neutral-400'
				role='complementary'
				aria-label='Chat panel'
			>
				<Chat data={data} />
			</div>
		</div>
	);
}
