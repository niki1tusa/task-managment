'use client';

import { Mail, PanelTopClose, PanelTopOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { LogOut } from '@/components/animate-ui/icons/log-out';
import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { PUBLIC_PAGES } from '@/config/public-page.config';

import { createClient } from '@/utils/supabase/client';

export const ProfileMenu = ({ data }: { data: TProfileRow }) => {
	const [isShowProfile, setIsShowProfile] = useState(true);
	const router = useRouter();
	if (!data) return null;

	async function signOut() {
		const { error } = await createClient().auth.signOut();

		if (!error) {
			router.push(PUBLIC_PAGES.LOGIN);
		}
	}
	return (
		<nav className='text-gray flex w-full flex-col pt-4 gap-4 text-base'>
			<div className='flex items-center gap-2'>
				<Title isMenuTitle={true}>PROFILE</Title>
				{isShowProfile ? (
					<PanelTopClose onClick={() => setIsShowProfile(false)} />
				) : (
					<PanelTopOpen onClick={() => setIsShowProfile(true)} />
				)}
			</div>
			{isShowProfile && (
				<>
					<div className='flex items-center gap-2'>
						<span> {data.name}</span>
					</div>
					<div className='flex items-center gap-2'>
						<Mail size={20} /> <span>{data.email}</span>
					</div>
					<AnimateIcon animateOnHover>
						<button onClick={signOut} className='flex items-center gap-2'>
							<LogOut size={20} /> Logout
						</button>
					</AnimateIcon>
				</>
			)}
		</nav>
	);
};
