import { Image, Link, MessageSquareText, Pencil } from 'lucide-react';
import { useState } from 'react';

import type { ITask } from '@/shared/types/task.types';

import { useClickOutside } from '@/hooks/useClickOutside';

import { Header } from './Header';
import { StatusBar } from './StatusBar';

export const Task = ({ task }: { task: ITask }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { ref } = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
	const status = Math.floor(
		(task.subTask.filter(item => item.isCompleted === true).length / task.subTask.length) * 100
	);
	return (
		<div className='bg-background flex flex-col gap-5 rounded-3xl border border-white text-sm shadow shadow-neutral-400 dark:border-none'>
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
					<div className='flex'>
						<Link size={19} />
						{task.link}
					</div>
				</div>
				<div ref={ref} className='mr-2 mb-2 flex gap-2'>
					<button className='bg-primary h-9 w-9 rounded-full text-2xl text-white shadow shadow-neutral-400'>
						+
					</button>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='bg-primary flex h-9 w-9 items-center justify-center rounded-full text-white shadow shadow-neutral-400'
					>
						<Pencil size={21} />
					</button>
					{isOpen && (
						<div className='absolute min-h-[60px] min-w-[100px] rounded-2xl border bg-amber-100'>
							<form className='p-2 flex flex-col'>
								<input type='text' placeholder='Replace heading' />
								<input type='text' placeholder='Replace status' />
								<input type='text' placeholder='Replace heading' />
							</form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
