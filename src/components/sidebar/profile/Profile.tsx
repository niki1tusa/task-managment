'use client';

import { ChevronDown, ChevronUp, Mail} from 'lucide-react';
import { useState } from 'react';

import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task/task.types';
import { Avatar } from '@/components/ui/Avatar';

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
			{/* {isShowProfile && (
				<>
					<div className='flex items-center gap-2'>
					<Avatar img={data.avatar_path || ''}/>	<span> {data.name}</span>
					</div>
					<div className='flex items-center gap-2'>
						<Mail size={20} /> <span>{data.email}</span>
					</div>
				</>
			)} */}
			<ProfileCard name={data.name || ''}  email={data.email || ''} avatar={data.avatar_path || ''}/>
		</nav>
	);
};
function ProfileCard({ name, email, avatar }: {name:string; email:string; avatar:string}) {
  return (
    <div className="rounded-xl border border-neutral-200/60 bg-white/60 dark:bg-neutral-900/60 p-3 shadow-sm backdrop-blur">
      <button className="group flex w-full items-center gap-3 text-left">
        <span className="relative">
          <img src={avatar} alt={name} className="h-10 w-10 rounded-full object-cover" />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="truncate text-xs text-neutral-500">{email}</p>
        </div>
        <svg className="ml-auto h-4 w-4 text-neutral-400 group-hover:text-neutral-600" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"/></svg>
      </button>
      {/* пример выпадающего меню — можешь заменить на свой дропдаун */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <a className="rounded-lg border border-neutral-200 px-2 py-1.5 text-center text-xs hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/60">Profile</a>
        <a className="rounded-lg border border-neutral-200 px-2 py-1.5 text-center text-xs hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/60">Settings</a>
        <button className="rounded-lg border border-neutral-200 px-2 py-1.5 text-center text-xs hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/60">Logout</button>
      </div>
    </div>
  );
}
