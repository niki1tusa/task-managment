import { Image, Link, MessageSquareText, Pencil } from 'lucide-react';

import { Header } from './Header';
import { StatusBar } from './StatusBar';
import type { ITask } from '@/shared/types/task.types';

export const Task = ({ task }: { task: ITask }) => {
	const status = Math.floor(
		(task.subTask.filter(item => item.isCompleted === true).length / task.subTask.length) * 100
	);
	return (
		<div className='border border-white dark:border-none text-sm rounded-3xl bg-background  flex flex-col gap-5 shadow shadow-neutral-400'>
			{/* 1 section */}
			<Header task={task} />
			{/* 2 section */}
			<StatusBar status={status} />
			{/* 3 section */}
			<div className='flex justify-between items-center mx-5 pb-2'>
				<div className='flex gap-2 justify-between'>
					<div className='flex '>
						<MessageSquareText size={19} />
						{task.comment}
					</div>
					<div className='flex'>
						<Image size={19} />
						{task.img}
					</div>
					<div className='flex '>
						<Link size={19} />
						{task.link}
					</div>
				</div>
				<div className='flex gap-2 mb-2 mr-2'>
					<button className='bg-primary text-2xl text-white rounded-full w-9 h-9 shadow shadow-neutral-400'>
						+
					</button>
					<button className='bg-primary  text-white rounded-full w-9 h-9 flex justify-center items-center shadow shadow-neutral-400'>
						<Pencil size={21} />
					</button>
				</div>
			</div>
		</div>
	);
};
