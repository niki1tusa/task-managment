import Image from 'next/image';
import React from 'react';

import type { ITask } from '@/shared/types/task.types';

export const Header = ({ task }: { task: ITask }) => {
	return (
		<div className='flex mx-5 gap-3 mt-3'>
			<div className=' rounded-full w-9 h-9 flex items-center justify-center shadow shadow-neutral-400'>
				<task.iconTheme color='#725cee' />
			</div>
			<div className='flex flex-col'>
				<span className='font-medium'>{task.title}</span>
				<span className='text-gray'>{task.deadline}</span>
			</div>
			<div className='flex -space-x-2'>
				{task.users.map(user => (
					<div key={user.id} className='bg-primary rounded-full overflow-hidden border w-9 h-9 flex items-center justify-center shadow shadow-neutral-400'>
						<Image src={user.img} alt='user' width={36} height={36} />
					</div>
				))}
			</div>
		</div>
	);
};
