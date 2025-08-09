import type { Metadata } from 'next';

import { Avatar } from '@/components/ui/Avatar';
import BackLink from '@/components/ui/BackLink';
import { Title } from '@/components/ui/Title';

import type { TTask } from '@/shared/types/task/task.types';

import { useFormatDateForTask } from '@/hooks/useFormatDateForTask';

import { getServerAllTask } from '@/services/tasks/task-server.service';

export const metadata: Metadata = {
	title: 'Task',
};

interface Props {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
	const { id } = await params;
	const tasks = await getServerAllTask();
	const data = tasks.data;
	const findTask: TTask = data?.find(task => task.id === id);
	const { displayDue, TaskIcon } = useFormatDateForTask(findTask);
	return (
		<div>
			<div className='flex flex-col gap-2 px-7'>
				<BackLink text='Back to Dashboard' />
				<header className='my-5'>
					<Title heading='page'>Task "{id}"</Title>
				</header>
				<span>Title: {findTask.title}</span>
				<span className='flex'>
					Icon: <TaskIcon />
				</span>
				{/* TODO: заменить owner_id на owner name */}
				<span>Owner: {findTask.owner_id}</span>
				<span className='flex items-center gap-2'>
					Participants:
					<span className='flex -space-x-2'>
						{findTask.task_participants
							.filter(u => Boolean(u.profile))
							.map((user, i) => {
								console.log(user);
								return (
									<Avatar key={`${user.profile_id}-${i}`} img={user.profile.avatar_path || ''} />
								);
							})}
					</span>
				</span>
				<span>Due: {findTask.due_date}</span>

				<span>Start time: {findTask.start_time}</span>
				<span>End time: {findTask.end_time}</span>
				<span>Status task: {displayDue}</span>

				<span>Comment: 1</span>
				<span>Image: 2</span>
				<span>Link: 3</span>
				<span>Color: {findTask.color}</span>
				<div className='flex flex-col gap-1'>
					<strong>Subtasks:</strong>
					<ul className='list-inside list-disc'>
						{findTask.sub_task.map(sub_task => (
							<li key={sub_task.id} className='flex items-center gap-2'>
								<span>{sub_task.title}</span>
								<span
									className={`rounded-full px-2 py-0.5 text-xs ${sub_task.is_completed ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}
								>
									{sub_task.is_completed ? 'Completed' : 'Pending'}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
