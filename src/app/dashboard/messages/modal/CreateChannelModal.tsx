'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';

import type { TTask } from '@/shared/types/task/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import type { TChannelInsert } from '../channel.types';

import ProfileList from './ProfileList';
import { createClientChannelByTaskId } from '@/services/channel/channel-client.service';
import { getAllProfile, getProfile } from '@/services/profile/profile-client.service';
import { getServerAllTask } from '@/services/tasks/task-server.service';

interface Props {
	close: () => void;
}
export function CreateChannelModal({ close }: Props) {
	const pathname = usePathname();
	const [typeChannel, setTypeChannel] = useState('');

	const [openList, setOpenList] = useState(false);
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
	if (pathname !== DASHBOARD_PAGES.MESSAGES) {
		console.log('close modal use if condiiton');
		close();
	}

	// TODO: сделать нормальный инпут как в Chat.tsx
	// TODO: сделать ограничение чтобы можно было добавлять макс 30 мин 1 в группу и макс 1 в директ
	return (
		<Modal close={close} title={`Create new channel ${typeChannel}`}>
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
						<div className='flex flex-wrap gap-2 border-t-2 border-b-2 py-2'>
							{tasks?.data?.length &&
								tasks.data.map((task: TTask) => (
									<Button key={task.id} onClick={() => setTtaskState(task)}>
										{task.title}
									</Button>
								))}
						</div>
						<div className='flex w-full gap-3'>
							<Button>Add</Button>
							<Button onClick={() => setTypeChannel('')}>Back</Button>
						</div>
					</>
				) : openList ? (
					<ProfileList close={close} profile={profile} setOpenList={setOpenList} typeChannel={typeChannel} />
				) : (
					<>
						<span className='text-lg'>Who should I add to this channel?</span>
						<div className='flex w-full gap-3'>
							<Button onClick={() => setOpenList(true)}>Open porifle list</Button>
							<Button onClick={() => setTypeChannel('')}>Back</Button>
						</div>
					</>
				)}
			</div>
		</Modal>
	);
}
