'use client';

import {
	Image as ImageIcon,
	Link as LucideLink,
	MessageSquareText,
	Plus,
	Trash2,
} from 'lucide-react';

import { Brush } from '@/components/animate-ui/icons/brush';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

import type { TTask } from '@/shared/types/task/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import { useModalStore } from '@/store/modals.store';

export const Footer = ({ task }: { task: TTask }) => {
	const { open } = useModalStore();
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
						open('deleteTask', task);
					}}
				>
					<Trash2 />
				</button>

				<button
					onClick={e => {
						e.stopPropagation();
						open('createSubTask', task.id);
					}}
					className='bg-primary flex h-9 w-9 items-center justify-center rounded-full text-white shadow shadow-neutral-400'
				>
					<Plus />
				</button>
				<button
					onClick={e => {
						
						open('updateTask', task.id);
					}}
					className='bg-primary flex h-9 w-9 items-center justify-center rounded-full text-white shadow shadow-neutral-400'
				>
					<AnimateIcon animateOnHover>
						<Brush size={22} />
					</AnimateIcon>
				</button>
			</div>
		</div>
	);
};
