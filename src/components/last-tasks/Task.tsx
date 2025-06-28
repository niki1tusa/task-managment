import { Image, Link, MessageSquareText, Pencil, ReceiptRussianRuble } from 'lucide-react';

import type { ITask } from './task.types';

export const Task = ({ task }: { task: ITask }) => {

	const getProgressColor = (status: number) => {
		if (status < 30) return 'bg-red-500';
		if (status < 70) return 'bg-yellow-400';
		if (status === 100) return 'bg-gradient-to-r from-purple-500 to-indigo-600';
		return 'bg-green';
	};

	return (
		<div className=' text-sm rounded-3xl bg-white flex flex-col gap-5 shadow shadow-neutral-400'>
			{/* 1 section */}
			<div className='flex mx-5 gap-3 mt-3'>
				<div className='bg-primary rounded-full w-9 h-9 flex items-center justify-center shadow shadow-neutral-400'>
					<task.iconTheme color='#725cee' />
				</div>
				<div className='flex flex-col'>
					<span className='font-medium'>{task.title}</span>
					<span className='text-gray'>{task.deadline}</span>
				</div>
				<div className='flex'>
					<div className='bg-primary rounded-full w-9 h-9 flex items-center justify-center shadow shadow-neutral-400'>
						1
					</div>
					<div className='bg-primary rounded-full w-9 h-9 flex items-center justify-center shadow shadow-neutral-400'>
						2
					</div>
					<div className='bg-primary rounded-full w-9 h-9 flex items-center justify-center shadow shadow-neutral-400'>
						3
					</div>
				</div>
			</div>
			{/* 2 section */}
			<div className=' bg-gray-200 rounded-full h-10 dark:bg-gray-700 mx-5 relative'>
				<div
					className={`${getProgressColor(task.status)} h-full  rounded-full`}
					style={{ width: `${task.status}%` }}
				/>
				<span className='absolute top-2.5 left-37 text-white font-medium'>{task.status === 100?'Done':`${task.status}%`}</span>
			</div>

			{/* 3 section */}
			<div className='flex justify-between items-center mx-5'>
				<div className='flex gap-2 justify-between'>
					<div className='flex '>
						<MessageSquareText size={19} />
						{task.comment}
					</div>
					<div className='flex'>
						<Image size={19} />
						{task.saveCount}
					</div>
					<div className='flex '>
						<Link size={19} />
						{task.link}
					</div>
				</div>
				<div className='flex gap-2 mb-2 mr-2'>
					<button className='bg-blueviolet text-2xl text-white rounded-full w-9 h-9'>+</button>
					<button className='bg-blueviolet  text-white rounded-full w-9 h-9 flex justify-center items-center'>
						<Pencil size={21} />
					</button>
				</div>
			</div>
		</div>
	);
};
