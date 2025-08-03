import Chat from '@/components/chat/Chat';
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
	if(!data) return null
	return (
		<div className='grid h-screen grid-cols-[15%_65%_20%]'>
			<div className='bg-side'>
				<Sidebar data={data} />
			</div>
			<main className='h-[100%] flex-1 dark:border-r dark:border-l dark:border-neutral-800'>
				{modals} {children}
			</main>
			<div className='bg-chat shadow shadow-neutral-400'>
				<Chat data={data}/>
			</div>
		</div>
	);
}
