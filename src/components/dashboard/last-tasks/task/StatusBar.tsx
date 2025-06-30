import cn from 'clsx';
import { CircleCheck } from 'lucide-react';
import { useMemo } from 'react';

import type { ITask } from '@/shared/types/task.types';

import '@/shared/styles/shimmer.animation.css';

// type Props = Pick<ITask, 'status'>;

export const StatusBar = ({ status }: { status: number }) => {
	const getProgressColor = useMemo(() => {
		if (status < 30) return 'bg-shimmer-red';
		if (status < 70) return 'bg-shimmer-yellow';
		if (status === 100) return 'bg-shimmer-done';
		return 'bg-shimmer-green';
	}, [status]);
	return (
		<div className='bg-gray relative mx-5 my-5 h-10 rounded-full'>
			<div
				className={cn(`${getProgressColor} h-full rounded-full transition-all duration-500`)}
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
};
