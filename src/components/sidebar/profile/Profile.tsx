import { ChevronDown } from 'lucide-react';

import { Heading } from '../../ui/Heading';

import type { IProfile } from '@/types/profile.types';

// import cn from 'clsx'
export const Profile = ({ data }: { data: IProfile }) => {
	return (
		<div>
			<Heading heading='Account' />
			<div
				className='flex items-center border rounded-4xl 
    font-semibold px-1.5 py-1 mt-2 bg-gray/10 text-gray shadow shadow-neutral-400'
			>
				<div className='flex gap-3 items-center'>
					<div className='rounded-full bg-blueviolet w-8 h-8 ' />
					<div className='flex flex-col text-[0.8rem]'>
						<div className='text-[1rem] text-dark dark:text-white'>{data.name}</div>
						<div>{data.email}</div>
					</div>
					<ChevronDown />
				</div>
			</div>
		</div>
	);
};
