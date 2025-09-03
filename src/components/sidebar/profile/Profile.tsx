'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { Avatar } from '@/components/ui/Avatar';
import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task/task.types';

export const ProfileMenu = ({ data }: { data: TProfileRow }) => {
	const [isShowProfile, setIsShowProfile] = useState(true);

	return !data ? (
		<Skeleton />
	) : (
		<nav className='text-foreground/40 flex w-full flex-col gap-4 pt-4 text-sm font-medium'>
			<div className='flex items-center gap-2'>
				<Title isMenuTitle={true}>PROFILE</Title>
				{isShowProfile ? (
					<ChevronUp className='text-foreground/60' onClick={() => setIsShowProfile(false)} />
				) : (
					<ChevronDown className='text-foreground/60' onClick={() => setIsShowProfile(true)} />
				)}
			</div>
			{isShowProfile && (
				<div className='bg-background flex items-center gap-2 rounded-md px-2 py-2 shadow shadow-neutral-400'>
					<div>
						<Avatar img={data.avatar_path} />
					</div>
					<div className='flex flex-col truncate text-[10px] 2xl:text-sm'>
						<span>{data.email}</span>
						<span> {data.name}</span>
					</div>
				</div>
			)}
		</nav>
	);
};
