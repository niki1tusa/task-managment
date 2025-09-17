'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import { Header } from '@/components/pages/dashboard/last-tasks/task/header/Header';

import type { TTask } from '@/shared/types/task/task.types';

import { useTaskStore } from '@/store/task.store';

export default function TeamTask({ task }: { task: TTask }) {
	const { activeTask, setActiveTask } = useTaskStore();
	return (
		<button onClick={() => setActiveTask(task)} style={{ perspective: 900 }} className='relative'>
			<motion.div
				initial={{ y: 0, boxShadow: '0px 4px 10px rgba(0,0,0,0.15)' }}
				whileHover={{
					y: -5,
					boxShadow: '5px 10px 15px rgba(0,0,0,0.45)',
				}}
				transition={{ type: 'spring', stiffness: 200, damping: 18 }}
				style={{ transformOrigin: 'left center' }}
				className={clsx(
					activeTask?.id === task.id
						? 'border-2 border-sky-500 '
						: 'border-2  border-white',
					'2xl:text-md bg-task-base rounded text-sm shadow shadow-neutral-400 transition-all hover:bg-gray-200 dark:border-none'
				)}
			>
				<Header task={task} />
			</motion.div>
		</button>
	);
}
