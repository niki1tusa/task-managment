import { Sidebar } from '@/components/sidebar/Sidebar';

import { getServerAuth } from '@/utils/supabase/get-server-auth';

import MainLayout from './MainLayout';
import { getServerProfile } from '@/services/profile/profile-server.service';

interface Props {
	children: React.ReactNode;
}
export default async function DashboardLayout({ children }: Props) {
	// pure ssr
	await getServerAuth(true);
	const data = await getServerProfile();
	if (!data) return null;
	return (
		<div className='grid grid-cols-[12%_88%]'>
			<aside
				className='bg-side sticky top-0 h-[100dvh]'
				role='navigation'
				aria-label='Main navigation'
			>
				<Sidebar data={data} />
			</aside>
			<MainLayout data={data}>{children}</MainLayout>
		</div>
	);
}
