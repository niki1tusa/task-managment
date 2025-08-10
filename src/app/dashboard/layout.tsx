import { Sidebar } from '@/components/sidebar/Sidebar';

import { getServerAuth } from '@/utils/supabase/get-server-auth';

import DashboardMain from './DashboardMain';
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
		<div className={'grid h-screen grid-cols-[15%_85%]'}>
			<div className='bg-side' role='navigation' aria-label='Main navigation'>
				<Sidebar data={data} />
			</div>
			{modals}
			<DashboardMain data={data}>{children}</DashboardMain>
		</div>
	);
}
