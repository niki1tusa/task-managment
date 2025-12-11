import { useRouter } from 'next/navigation';

import { PUBLIC_PAGES } from '@/shared/config/public-page-config';
import { createClient } from '@/shared/lib/supabase/client';
import { Title } from '@/shared/ui/Title';
import { AnimateIcon } from '@/shared/ui/animate-ui/icons/icon';
import { LogOut } from '@/shared/ui/animate-ui/icons/log-out';

export default function Logout() {
	const router = useRouter();
	async function signOut() {
		const { error } = await createClient().auth.signOut();

		if (!error) {
			router.push(PUBLIC_PAGES.LOGIN);
		}
	}
	return (
		<nav className='text-gray flex w-full flex-col gap-4'>
			<span className='border-gray/30 mt-4 block w-[80%] border-b-2' />
			<Title isMenuTitle={true}>LOGOUT</Title>
			<AnimateIcon animateOnHover>
				<button onClick={signOut} className='flex items-center gap-2'>
					<LogOut size={20} />
				</button>
			</AnimateIcon>
		</nav>
	);
}
