'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

import type { IProfile } from '@/shared/types/profile.types';
import { Title } from '@/components/ui/Title';
import { PROFILE } from '@/shared/data/profile.data';

// import cn from 'clsx'
export const Profile = () => {
	const data = PROFILE
	// const [isShowMenu, setIsShowMenu] = useState(false);
	return (
		<div className='pt-4'>
			<div className='flex items-center justify-between'>
				<Title isMenuTitle={true}>Account</Title>
				{/* {isShowMenu ? <PanelLeftOpen color='gray' /> : <PanelLeftClose color='gray' />} */}
			</div>
			<div className='bg-gray/10 text-gray mt-2 flex items-center rounded-xl border px-0.5 py-1 font-semibold shadow shadow-neutral-400 2xl:px-1.5'>
				<div className='flex items-center gap-3'>
					<div className='bg-primary h-6 w-6 overflow-hidden rounded-full shadow shadow-neutral-400 2xl:h-8 2xl:w-8'>
						<Image src={data.img} alt='profile' width={32} height={32} />
					</div>
					<div className='flex flex-col text-[0.5rem] lg:text-[0.8rem]'>
						<div className='text-dark text-[0.8rem] lg:text-[1rem] dark:text-white'>
							{data.name}
						</div>
						<div>{data.email}</div>
					</div>
					<ChevronDown />
				</div>
			</div>
		</div>
	);
};
