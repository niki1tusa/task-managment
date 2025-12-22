'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { GUARD_PAGES } from '@/shared/config/guard-page-config';
import type { Task as TaskType } from '@/shared/model/task-types';

import { TaskFooter } from './TaskFooter';
import { TaskHeader } from './TaskHeader';
import TaskStatusBar from './TaskStatusBar';

export const Task = ({ task }: { task: TaskType }) => {
	const router = useRouter();
	return (
		<div
			style={{ perspective: 900 }}
			className='relative'
			onClick={() => router.push(GUARD_PAGES.TASK(task.id))}
		>
			<Link
				href={GUARD_PAGES.TASK(task.id)}
				className='pointer-events-none absolute inset-0 z-10'
				aria-hidden='true'
				tabIndex={-1}
			/>
			<motion.div
				initial={{ y: 0, boxShadow: '0px 4px 10px rgba(0,0,0,0.15)' }}
				whileHover={{
					y: -5,
					boxShadow: '5px 10px 15px rgba(0,0,0,0.45)',
				}}
				transition={{ type: 'spring', stiffness: 200, damping: 18 }}
				style={{ transformOrigin: 'left center' }}
				className={clsx(
					'bg-task-base 2xl:text-md xl:[290px] transition-color grid grid-cols-1 grid-rows-3 gap-3 rounded-3xl border border-white text-sm xl:h-[241px] dark:border-none'
				)}
			>
				<TaskHeader task={task} />

				<TaskStatusBar task={task} />

				<TaskFooter task={task} />
			</motion.div>
		</div>
	);
};
