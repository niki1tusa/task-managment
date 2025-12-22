import clsx from 'clsx';
import { CircleCheck } from 'lucide-react';

import type { Task } from '@/shared/model/task-types';
import '@/shared/styles/shimmer-animation.css';

import { calcStatus } from './calcStatus';
import { getProgressColor } from './getProgressColor';

export default function TaskStatusBar({ task }: { task: Task }) {
	const status = calcStatus(task.sub_task);

	const color = getProgressColor(status);
	return (
		<div className='bg-gray relative mx-5 my-4 h-10 rounded-full'>
			<div
				className={clsx(`${color} h-full rounded-full transition-all duration-500`)}
				style={{ width: `${status}%`, minWidth: status > 0 ? '4px' : '0' }}
			/>
			<span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform font-medium text-white'>
				{status === 100 ? (
					<span className='flex items-center gap-0.5'>
						<CircleCheck size={20} />
						Done
					</span>
				) : (
					`${status}%`
				)}
			</span>
		</div>
	);
}
