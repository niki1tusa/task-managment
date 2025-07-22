import Chat from '@/components/chat/Chat';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { PUBLIC_PAGES } from '@/config/public-page.config';
import { getServerAuth } from '@/utils/supabase/get-server-auth';
import { redirect } from 'next/navigation';

interface Props {
	children: React.ReactNode;
	modals: React.ReactNode;
}
export default async function DashboardLayout({ children, modals }: Props) {
	// pure ssr 
	const user = await getServerAuth()
	if(!user){
		redirect(PUBLIC_PAGES.LOGIN)
	}
	
	//
	return (
		<div className='grid grid-cols-[15%_60%_25%]'>
			<Sidebar />
			<main className='h-[100%] flex-1 dark:border-r dark:border-l dark:border-neutral-800'>
				{modals} {children}
			</main>
			<Chat />
		</div>
	);
}
