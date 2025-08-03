'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task.types';

// import cn from 'clsx'
export const Profile = ({ data }: { data: TProfileRow }) => {
	const isPending = false;
	if (!data) return null;
	// const [isShowMenu, setIsShowMenu] = useState(false);
	return (
		<div className='w-[160px] pt-4 2xl:min-w-[230px]'>
			<div className='flex items-center justify-between'>
				<Title isMenuTitle={true}>Account</Title>
				{/* {isShowMenu ? <PanelLeftOpen color='gray' /> : <PanelLeftClose color='gray' />} */}
			</div>

			<div className='bg-gray/10 text-gray mt-2 flex items-center rounded-xl border px-0.5 py-1 font-semibold shadow shadow-neutral-400 2xl:px-1.5'>
				<div className='flex items-center gap-3 py-1 pl-1'>
					{data.avatar_path ? (
						<Image
							src={data.avatar_path}
							className='rounded-full'
							alt='profile'
							width={32}
							height={32}
						/>
					) : (
						<div className='bg-primary h-8 w-8 overflow-hidden rounded-full shadow shadow-neutral-400 2xl:h-8 2xl:w-8' />
					)}

					<div className='flex flex-col text-[0.5rem] lg:text-[0.8rem]'>
						<div className='text-dark text-[0.8rem] 2xl:text-[1rem] dark:text-white'>
							{data.name}
						</div>
						<div className='hidden 2xl:block'>{data.email}</div>
					</div>
					<ChevronDown />
				</div>
			</div>
		</div>
	);
};
