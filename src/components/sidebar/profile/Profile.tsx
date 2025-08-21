'use client';

import { Mail, PanelTopClose, PanelTopOpen } from 'lucide-react';
import { useState } from 'react';

import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task/task.types';

export const ProfileMenu = ({ data }: { data: TProfileRow }) => {
	const [isShowProfile, setIsShowProfile] = useState(true);

	return !data ? (
		<Skeleton />
	) : (
		<nav className='text-gray flex w-full flex-col gap-4 pt-4 text-base'>
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
				</>
			)}
		</nav>
	);
};
