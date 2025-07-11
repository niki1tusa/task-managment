'use client';

import { Image, Link as LucideLink, LucideTrash2, MessageSquareText, Pencil, Plus, Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

import type { ITask } from '@/shared/types/task.types';

import { PAGE } from '@/config/page.config';

import { TaskBtnAction } from './TaskBtnAction';
import  { useTaskStore } from '@/store/store';

interface Props {
	task: ITask;
}
export const Footer = ({ task }: Props) => {
	const pathname = usePathname();
	const deleteTask = useTaskStore(state=> state.deleteTask)
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
			<button className='bg-red-500/80 flex h-9 w-9 items-center justify-center rounded-full text-white shadow shadow-neutral-400' onClick={()=>deleteTask(task.id)}>
				<Trash2 />
			</button>
				<TaskBtnAction href={PAGE.ADD_SUBTASK(task.id)}>
					<Plus />
				</TaskBtnAction>
				{pathname !== PAGE.TASK_EDIT(task.id) && (
					<TaskBtnAction href={PAGE.TASK_EDIT(task.id)}>
						<Pencil size={21} />
					</TaskBtnAction>
				)}
			</div>
		</div>
	);
};
