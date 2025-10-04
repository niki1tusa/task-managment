'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { TChannelInsert } from '@/components/pages/messages/channel/channel.types';
import { Button } from '@/components/ui/button/Button';
import { DASHBOARD_PAGES } from '@/components/ui/config/dashboard-page.config';
import Modal from '@/components/ui/modal/Modal';

import type { TTask } from '@/shared/types/task/task.types';

import { useChannels } from '@/hooks/useChannels';
import { useProfile } from '@/hooks/useProfile';

import ProfileModalList from './profile-modal-list/ProfileModalList';
import { createClientChannelByTaskId } from '@/services/channel/channel-client.service';
import { getServerAllTask } from '@/services/tasks/task-server.service';

interface Props {
	close: () => void;
}
export function CreateChannelModal({ close }: Props) {
	const queryClient = useQueryClient();
	const pathname = usePathname();
	const [typeChannel, setTypeChannel] = useState('');
	const { channels } = useChannels();
	const [openList, setOpenList] = useState(false);
	const [taskState, setTtaskState] = useState<TTask>();
	// get task for option channel by task
	const { data: tasks } = useQuery({
		queryKey: ['task'],
		queryFn: async () => await getServerAllTask(),
	});
	const { profile } = useProfile();

	const { mutate } = useMutation({
		mutationFn: ({ fields, taskId }: { fields: TChannelInsert; taskId: string }) =>
			createClientChannelByTaskId(fields, taskId),
		onSuccess: () => {
			toast.success(`Channel by task is success created!`);
			queryClient.invalidateQueries({ queryKey: ['channels'], exact: false });
		},
		onError: err => {
			console.log(err);
			toast.error('Channel is error!');
		},
	});

	const handleCreateChannelTask = () => {
		if (!taskState) return;
		mutate({ fields: { name: taskState!.title, created_by: profile!.id }, taskId: taskState!.id });
		close();
	};

	if (pathname !== DASHBOARD_PAGES.MESSAGES) {
		console.log('close modal use if condiiton');
		close();
	}

	const filteredTasks = tasks?.data?.filter(
		task => !(channels ?? []).some(channel => channel.task_id === task.id)
	);
	return (
		<Modal close={close} title={`Create new channel ${typeChannel}`}>
			<div className='flex w-full flex-col gap-3'>
				{!typeChannel ? (
					<>
						<span className='text-lg'>Select the channel type:</span>
						<div className='flex w-full justify-between gap-3'>
							<Button onClick={() => setTypeChannel('group')}>Group</Button>
							<Button disable={!filteredTasks?.length} onClick={() => setTypeChannel('task')}>
								Task
							</Button>
							<Button onClick={() => setTypeChannel('direct')}>Direct</Button>
						</div>
					</>
				) : typeChannel === 'task' ? (
					<>
						<div className='flex flex-col items-center gap-4 border-t-2 border-b-2 py-4'>
							{filteredTasks?.length &&
								filteredTasks?.map((task: TTask) => (
									<Button
										variant='transparent'
										className={clsx(
											taskState?.id === task.id &&
												'shadow-lg ring-2 shadow-indigo-400/40 ring-indigo-500! ring-offset-2',
											'hover:bg-primary/50 w-[80%] 2xl:text-lg'
										)}
										onClick={() => setTtaskState(task)}
										key={task.id}
									>
										{task.title}
									</Button>
								))}
						</div>
						<div className='flex w-full gap-3'>
							<Button onClick={() => handleCreateChannelTask()}>Add</Button>
							<Button onClick={() => setTypeChannel('')}>Back</Button>
						</div>
					</>
				) : openList ? (
					<ProfileModalList
						close={close}
						profile={profile!}
						setOpenList={setOpenList}
						typeChannel={typeChannel}
					/>
				) : (
					<>
						<span className='text-lg'>Who should I add to this channel?</span>
						<div className='flex w-full gap-3 py-2'>
							<Button onClick={() => setOpenList(true)}>Open List</Button>
							<Button onClick={() => setTypeChannel('')}>Back</Button>
						</div>
					</>
				)}
			</div>
		</Modal>
	);
}
