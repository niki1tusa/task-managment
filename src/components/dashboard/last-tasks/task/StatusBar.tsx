import cn from 'clsx';
import { CircleCheck } from 'lucide-react';

import type { ITask } from '@/shared/types/task.types';

import '@/shared/styles/shimmer.animation.css';

type Props = Pick<ITask, 'status'>;
export const StatusBar = ({ status }: Props) => {
	const getProgressColor = (status: number) => {
		if (status < 30) return 'bg-red-500';
		if (status < 70) return 'bg-yellow-400';
		if (status === 100) return 'bg-shimmer';
		return 'bg-green-500';
	};
	return (
		<div className=' bg-gray rounded-full h-10 mx-5 relative'>
			<div
				className={cn(
					`${getProgressColor(status)} h-full rounded-full transition-all duration-500`
				)}
				style={{ width: `${status}%` }}
			/>
			<span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white font-medium'>
				{status === 100 ? (
					<span className='flex gap-0.5 items-center'>
						<CircleCheck size={20} />
						Done
					</span>
				) : (
					`${status}%`
				)}
			</span>
		</div>
	);
};
