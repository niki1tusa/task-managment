'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { DASHBOARD_PAGES } from '@/components/ui/config/dashboard-page.config';

import type { TSubTaskRow } from '@/shared/types/subtask/subtask.types';
import type { TTask } from '@/shared/types/task/task.types';

import { Header } from '../../../../ui/header/Header';

import { Footer } from './Footer';
import { StatusBar } from './StatusBar';

export const Task = ({ task }: { task: TTask }) => {
	const router = useRouter();

	const status = (data: TTask) => {
		return Math.floor(
			(data.sub_task.filter((item: TSubTaskRow) => item.is_completed === true).length /
				data.sub_task.length) *
				100
		);
	};

	return (
		<div
			style={{ perspective: 900 }}
			className='relative'
			onClick={() => router.push(DASHBOARD_PAGES.TASK(task.id))}
		>
			<Link
				href={DASHBOARD_PAGES.TASK(task.id)}
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
					'bg-task-base 2xl:text-md xl:[290px] transition-color grid grid-cols-1 grid-rows-3 gap-3 rounded-3xl border border-white text-sm shadow shadow-neutral-400 xl:h-[241px] dark:border-none'
				)}
			>
				<Header task={task} />

				<StatusBar status={status(task)} />

				<Footer task={task} />
			</motion.div>
		</div>
	);
};
