import { tasks } from '../../data/task.data';

import { Task } from './task/Task';

export const LastTasks = () => {
	const count = tasks.length;
	return (
		<div className='mt-5'>
			<h1 className='mb-3 font-medium text-[22px]'>
				Last Tasks <span className='opacity-50'>({count})</span>
			</h1>
			<div className='grid grid-cols-3 gap-2 '>
				{tasks.length ? (
					tasks.map(task => <Task key={task.id} task={task} />)
				) : (
					<div>Task not found.</div>
				)}
			</div>
		</div>
	);
};
