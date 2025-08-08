import clsx from 'clsx';
import { motion } from 'framer-motion';

import type { TSubTaskRow, TTask } from '@/shared/types/task/task.types';

import { Avatar } from '../../../ui/Avatar';

import { Footer } from './Footer';
import { StatusBar } from './StatusBar';
import { Header } from './header/Header';

// TODO: первые три задачи более растянутые
interface Props {
	task: TTask;
	className?: string;
	isMinimal?: boolean;
}
export const Task = ({ task, className, isMinimal }: Props) => {
	const status = (data: TTask) => {
		return Math.floor(
			(data.sub_task.filter((item: TSubTaskRow) => item.is_completed === true).length /
				data.sub_task.length) *
				100
		);
	};

	// hover:scale-105
	return (
		<div style={{ perspective: 900 }}>
			<motion.div
				initial={{ rotateY: 0, boxShadow: '0px 4px 10px rgba(0,0,0,0.15)' }}
				whileHover={{
					rotateY: -10,
					boxShadow: '5px 10px 15px rgba(0,0,0,0.45)',
				}}
				transition={{ type: 'spring', stiffness: 200, damping: 18 }}
				style={{ transformOrigin: 'left center' }}
				className={clsx(
					'bg-task-base 2xl:text-md xl:[290px] transition-color grid grid-cols-1 gap-3 rounded-3xl border border-white text-sm shadow shadow-neutral-400 xl:h-[241px] dark:border-none',
					className ? `${className} grid-rows-2 text-white` : 'grid-rows-3',
					{ 'max-h-[144px]': isMinimal }
				)}
			>
				{/* 1 section */}
				<Header task={task} isMinimal={isMinimal} />
				{/* 2 section */}
				{!isMinimal && <StatusBar status={status(task)} />}
				{/* 3 section */}
				{isMinimal ? (
					<div className='mx-5 mt-2 flex -space-x-2'>
						{task.task_participants
							.filter(u => Boolean(u.profile))
							.map((profile, i) => (
								<Avatar
									key={`${profile.profile_id}-${i}`}
									img={profile.profile.avatar_path || ''}
								/>
							))}
					</div>
				) : (
					<Footer task={task} />
				)}
			</motion.div>
		</div>
	);
};
