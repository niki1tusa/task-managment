import { Image, Link as LucideLink, MessageSquareText, Pencil } from 'lucide-react';

import { Header } from './Header';
import { StatusBar } from './StatusBar';
import type { ITask } from '@/shared/types/task.types';
import { PAGE } from '@/config/page.config';
import Link from 'next/link';

export const Task = ({ task }: { task: ITask }) => {

	const status = Math.floor(
		(task.subTask.filter(item => item.isCompleted === true).length / task.subTask.length) * 100
	);

	return (
		<div className='bg-background grid grid-cols-1 grid-rows-3 gap-3 rounded-3xl border border-white text-sm shadow shadow-neutral-400 dark:border-none'>
			{/* 1 section */}
			<Header task={task} />
			{/* 2 section */}
			<StatusBar status={status} />
			{/* 3 section */}
			<div className='mx-5 flex items-center justify-between pb-2'>
				<div className='flex justify-between gap-2'>
					<div className='flex'>
						<MessageSquareText size={19} />
						{task.comment}
					</div>
					<div className='flex'>
						<Image size={19} />
						{task.img}
					</div>
					<div className='flex '>
						<LucideLink size={19} />
						{task.link}
					</div>
				</div>
				<div className='mr-2 mb-2 flex gap-2'>
					<button className='bg-primary h-9 w-9 rounded-full text-2xl text-white shadow shadow-neutral-400'>
						+
					</button>
					<Link href={PAGE.TASK_EDIT(task.id)} className='bg-primary  text-white rounded-full w-9 h-9 flex justify-center items-center shadow shadow-neutral-400'>
						<Pencil size={21} />
					</Link>
				</div>
			</div>
		</div>
	);
};
