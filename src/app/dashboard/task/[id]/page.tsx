import type { Metadata } from 'next';

import { Avatar } from '@/components/ui/Avatar';
import BackLink from '@/components/ui/BackLink';
import { Title } from '@/components/ui/Title';

import { type IconName, MODAL_ICON } from '@/shared/data/icon.data';
import type { TSubTaskRow, TTask } from '@/shared/types/task/task.types';

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
	const TaskIcon = MODAL_ICON[findTask.icon as IconName];
	const date = Math.ceil(
		(new Date(findTask.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
	);

	const displayDue =
		date === 0
			? 'Today'
			: date < 0
				? findTask.sub_task.every((subTask: TSubTaskRow) => subTask.is_completed)
					? 'Done'
					: 'Overdue'
				: ` ${date} days`;
	return (
		<div className='space-y-6 px-7 py-3.5'>
			<BackLink text='Back to Dashboard' />

			<header className='border-b pb-4'>
				<Title heading='page'>Task &quot;{id}&quot;</Title>
			</header>

			<section className='space-y-2 text-sm'>
				<div>
					<span className='font-medium text-gray-500'>Title:</span> {findTask.title}
				</div>
				<div className='flex items-center gap-2'>
					<span className='font-medium text-gray-500'>Icon:</span>
					<TaskIcon />
				</div>
				<div>
					<span className='font-medium text-gray-500'>Owner:</span> {findTask.owner_id}
				</div>
				<div className='flex items-center gap-2'>
					<span className='font-medium text-gray-500'>Participants:</span>
					<div className='flex -space-x-2'>
						{findTask.task_participants
							.filter(u => Boolean(u.profile))
							.map((user, i) => (
								<Avatar
									key={`${user.profile_id}-${i}`}
									img={user.profile.avatar_path || ''}
									isHoverResolution={true}
								/>
							))}
					</div>
				</div>
				<div>
					<span className='font-medium text-gray-500'>Due:</span> {findTask.due_date}
				</div>
				<div>
					<span className='font-medium text-gray-500'>Start time:</span> {findTask.start_time}
				</div>
				<div>
					<span className='font-medium text-gray-500'>End time:</span> {findTask.end_time}
				</div>
				<div>
					<span className='font-medium text-gray-500'>Status task:</span>
					<span
						className={`ml-2 rounded-full px-3 py-1 text-xs font-medium ${
							displayDue.includes('Overdue')
								? 'bg-red-100 text-red-700'
								: 'bg-green-100 text-green-700'
						}`}
					>
						{displayDue}
					</span>
				</div>
			</section>

			<section className='grid grid-cols-3 gap-5'>
				<div className='items-center rounded-lg border bg-gray-50 p-3'>
					<strong>Comment</strong>
					<p className='text-lg text-gray-600'>1</p>
				</div>
				<div className='rounded-lg border bg-gray-50 p-3'>
					<strong>Image</strong>
					<p className='text-lg text-gray-600'>2</p>
				</div>
				<div className='rounded-lg border bg-gray-50 p-3'>
					<strong>Link</strong>
					<p className='text-lg text-gray-600'>3</p>
				</div>
			</section>

			<section>
				<strong className='mb-2 block'>Subtasks:</strong>
				<ul className='space-y-1'>
					{findTask.sub_task.map(sub_task => (
						<li
							key={sub_task.id}
							className='flex items-center justify-between rounded-md border bg-white p-2 shadow-sm'
						>
							<span>{sub_task.title}</span>
							<span
								className={`rounded-full px-2 py-0.5 text-xs font-medium ${
									sub_task.is_completed
										? 'bg-green-200 text-green-800'
										: 'bg-gray-200 text-gray-600'
								}`}
							>
								{sub_task.is_completed ? 'Completed' : 'Pending'}
							</span>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
