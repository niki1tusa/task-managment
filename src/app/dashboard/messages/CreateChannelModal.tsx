import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';

import type { TTask } from '@/shared/types/task/task.types';

import type { TChannelInsert, TChannelRow } from './channel.types';
import { createClientChannelByTaskId } from '@/services/channel/channel-client.service';
import { getProfile } from '@/services/profile/profile-client.service';
import { getServerAllTask } from '@/services/tasks/task-server.service';

interface Props {
	close: () => void;
}
export function CreateChannelModal({ close }: Props) {
	const [typeChannel, setTypeChannel] = useState('');
	const [taskState, setTtaskState] = useState<TTask>();
	// get task for option channel by task
	const { data: tasks } = useQuery({
		queryKey: ['task'],
		queryFn: async () => await getServerAllTask(),
	});
	const { data: profile } = useQuery({
		queryKey: ['profile'],
		queryFn: () => getProfile(),
	});

	const { mutate } = useMutation({
		mutationFn: ({ fields, taskId }: { fields: TChannelInsert; taskId: string }) =>
			createClientChannelByTaskId(fields, taskId),
	});

	useEffect(() => {
		if (!taskState) return;
		mutate({ fields: { name: taskState!.title, created_by: profile.id }, taskId: taskState!.id });
		close();
	}, [taskState]);
	return (
		<Modal close={close} title='Create new channel'>
			<div className='flex w-full flex-col gap-3'>
				{!typeChannel ? (
					<>
						<span className='text-lg'>Select the channel type:</span>
						<div className='flex w-full justify-between gap-3'>
							<Button onClick={() => setTypeChannel('group')}>Group</Button>
							<Button onClick={() => setTypeChannel('task')}>Task</Button>
							<Button onClick={() => setTypeChannel('direct')}>Direct</Button>
						</div>
					</>
				) : typeChannel === 'task' ? (
					<>
						{tasks?.data?.length &&
							tasks.data.map((task: TTask) => (
								<Button key={task.id} onClick={() => setTtaskState(task)}>
									{task.title}
								</Button>
							))}
					</>
				) : (
					<>
						<span className='text-lg'>Who should I add to this channel?</span>
						<div className='flex w-full gap-3'>
							<Button>Open porifle list</Button>
							<Button onClick={() => setTypeChannel('')}>Back</Button>
						</div>
					</>
				)}
			</div>
		</Modal>
	);
}
