'use client';

import {
	Image as ImageIcon,
	Link as LucideLink,
	MessageSquareText,
	Plus,
	Trash2,
} from 'lucide-react';
import { usePathname } from 'next/navigation';


import { Brush } from '@/components/animate-ui/icons/brush';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

import type { TTask } from '@/shared/types/task/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';


import { TaskBtnAction } from './TaskBtnAction';
import { useConfirmStore } from '@/shared/store/confirm.store';

export const Footer = ({ task }: { task: TTask }) => {
	const pathname = usePathname();
	const {open} = useConfirmStore()
	return (
		<div className='mx-5 flex items-center justify-between pb-2'>
			<div className='flex justify-between gap-2'>
				<div className='flex'>
					<MessageSquareText size={19} />3
				</div>
				<div className='flex'>
					<ImageIcon size={19} />1
				</div>
				<div className='flex'>
					<LucideLink size={19} />1
				</div>
			</div>
			<div className='mr-2 mb-2 flex gap-2'>
				<button
					className='flex h-9 w-9 items-center justify-center rounded-full bg-red-500/80 text-white shadow shadow-neutral-400'
					onClick={e => {
						e.stopPropagation();
						open(task);
					}}
				>
					<Trash2 />
				</button>
				<TaskBtnAction href={DASHBOARD_PAGES.ADD_SUBTASK(task.id)}>
					<Plus />
				</TaskBtnAction>
				{pathname !== DASHBOARD_PAGES.TASK_EDIT(task.id) && (
					<TaskBtnAction href={DASHBOARD_PAGES.TASK_EDIT(task.id)}>
						<AnimateIcon animateOnHover>
							<Brush size={22} />
						</AnimateIcon>
					</TaskBtnAction>
				)}
			</div>
		</div>
	);
};
