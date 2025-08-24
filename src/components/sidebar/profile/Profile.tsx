'use client';

import { ChevronDown, ChevronUp, Mail } from 'lucide-react';
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
		<nav className='text-gray flex w-full flex-col gap-4 pt-4 text-base'>
			<div className='flex items-center gap-2'>
				<Title isMenuTitle={true}>PROFILE</Title>
				{isShowProfile ? (
					<ChevronUp onClick={() => setIsShowProfile(false)} />
				) : (
					<ChevronDown onClick={() => setIsShowProfile(true)} />
				)}
			</div>
			{isShowProfile && (
				<div className='bg-background rounded-sm px-2 py-2 gap-2 flex shadow shadow-neutral-400'>
					<div >
						<Avatar img={data.avatar_path} />
					</div>
					<div className='flex flex-col truncate'>
						<span>{data.email}</span>
						<span> {data.name}</span>
					</div>
				</div>
			)}
		</nav>
	);
};
