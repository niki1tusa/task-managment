import { useRouter } from 'next/navigation';

import { AnimateIcon } from '@/components/animate-ui/icons/icon';

import { PUBLIC_PAGES } from '@/config/public-page-config';

import { createClient } from '@/utils/supabase/client';

import { LogOut } from '../animate-ui/icons/log-out';
import { Title } from '../ui/Title';

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
