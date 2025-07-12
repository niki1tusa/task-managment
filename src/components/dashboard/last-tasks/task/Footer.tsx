'use client';

import { Image, Link as LucideLink, MessageSquareText, Pencil, Plus, Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

import type { ITask } from '@/shared/types/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboardPage.config';

import { useTaskStore } from '@/store/store';

import { TaskBtnAction } from './TaskBtnAction';

interface Props {
	task: ITask;
}
export const Footer = ({ task }: Props) => {
	const pathname = usePathname();
	const deleteTask = useTaskStore(state => state.deleteTask);
	return (
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
					<LucideLink size={19} />
					{task.link}
				</div>
			</div>
			<div className='mr-2 mb-2 flex gap-2'>
				<button
					className='flex h-9 w-9 items-center justify-center rounded-full bg-red-500/80 text-white shadow shadow-neutral-400'
					onClick={() => deleteTask(task.id)}
				>
					<Trash2 />
				</button>
				<TaskBtnAction href={DASHBOARD_PAGES.ADD_SUBTASK(task.id)}>
					<Plus />
				</TaskBtnAction>
				{pathname !== DASHBOARD_PAGES.TASK_EDIT(task.id) && (
					<TaskBtnAction href={DASHBOARD_PAGES.TASK_EDIT(task.id)}>
						<Pencil size={21} />
					</TaskBtnAction>
				)}
			</div>
		</div>
	);
};
