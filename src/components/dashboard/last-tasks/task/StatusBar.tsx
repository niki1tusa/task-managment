import { CircleCheck } from 'lucide-react';

import type { ITask } from '@/types/task.types';

type Props = Pick<ITask, 'status'>;
export const StatusBar = ({ status }: Props) => {
	const getProgressColor = (status: number) => {
		if (status < 30) return 'bg-red-500';
		if (status < 70) return 'bg-yellow-400';
		if (status === 100) return 'bg-gradient-to-r from-purple-500 to-indigo-600';
		return 'bg-green';
	};
	return (
		<div className=' bg-gray-200 rounded-full h-10 dark:bg-gray-700 mx-5 relative'>
			<div
				className={`${getProgressColor(status)} h-full  rounded-full`}
				style={{ width: `${status}%` }}
			/>
			<span className='absolute top-2.5 left-37 text-white font-medium'>
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
