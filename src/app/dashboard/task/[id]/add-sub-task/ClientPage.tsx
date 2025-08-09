'use client';

import BackLink from '@/components/ui/BackLink';
import { Title } from '@/components/ui/Title';

import type { TGetTasksResponse, TTask } from '@/shared/types/task/task.types';

import { ListSubTask } from '../../../../../components/dashboard/modals/ListSubTask';

interface Props {
	id: string;
	tasks: TGetTasksResponse[0];
}
export const ClientPage = ({ id, tasks }: Props) => {
	const findTask = tasks.find((item: TTask) => item.id === id) || tasks[0];
	return (
		<div className='px-5'>
			<div className='flex flex-col gap-1 p-6'>
				<Title>Add Sub Task</Title>
				<BackLink text='BackLink ' />
				<p>task id &rdquo;{id}&rdquo;;</p>
				<ListSubTask task={findTask} />
			</div>
		</div>
	);
};
