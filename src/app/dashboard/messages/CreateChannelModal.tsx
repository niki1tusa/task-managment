'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Checkbox } from '@/components/animate-ui/base/checkbox';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/field/Field';
import Modal from '@/components/ui/modal/Modal';

import type { TProfileRow, TTask } from '@/shared/types/task/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import type { TChannelInsert } from './channel.types';
import {
	createClientChannelByTaskId,
	createClientChannelDirect,
	createClientChannelGroup,
} from '@/services/channel/channel-client.service';
import { getAllProfile, getProfile } from '@/services/profile/profile-client.service';
import { getServerAllTask } from '@/services/tasks/task-server.service';

interface Props {
	close: () => void;
}
export function CreateChannelModal({ close }: Props) {
	const pathname = usePathname();
	const [typeChannel, setTypeChannel] = useState('');
	const [addProfileArr, setAddProfileArr] = useState<string[]>([]);
	const [nameChannel, setNameChannel] = useState('');
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

	const { data: profiles } = useQuery({
		queryKey: ['profiles'],
		queryFn: () => getAllProfile(),
	});

	const { mutate } = useMutation({
		mutationFn: ({ fields, taskId }: { fields: TChannelInsert; taskId: string }) =>
			createClientChannelByTaskId(fields, taskId),
	});
	const { mutate: mutateChannelGroup } = useMutation({
		mutationFn: ({ fields, profilesId }: { fields: TChannelInsert; profilesId: string[] }) =>
			createClientChannelGroup(fields, profilesId),
	});
	const { mutate: mutateChannelDirect } = useMutation({
		mutationFn: ({ fields, profileId }: { fields: TChannelInsert; profileId: string }) =>
			createClientChannelDirect(fields, profileId),
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
	const handleCreateGroup = (profilesId: string[]) => {
		mutateChannelGroup({ fields: { name: nameChannel, created_by: profile.id }, profilesId });
		setNameChannel('');
		setAddProfileArr([]);
		close();
	};
	const handleCreateDirect = (profileId: string) => {
		mutateChannelDirect({ fields: { name: nameChannel, created_by: profile.id }, profileId });
		setNameChannel('');
		setAddProfileArr([]);
		close();
	};
	const handleAddProfile = (profileToAdd: TProfileRow) => {
		if (!addProfileArr.some(p => p === profileToAdd.id)) {
			setAddProfileArr([...addProfileArr, profileToAdd.id]);
		}
	};
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
					<div className='grid h-[70vh] max-h-[60vh] grid-rows-[auto_1fr_auto] gap-2'>
						<span className='flex gap-2 py-2 text-base font-medium'>
							<span>Choice profile:</span>
							<span>
								{addProfileArr.length}/{typeChannel === 'group' ? 30 : 1}
							</span>
						</span>
						<textarea
							rows={1}
							placeholder={`Enter ${typeChannel} name...`}
							value={nameChannel}
							onChange={e => setNameChannel(e.target.value)}
							className='flex-1 resize-none rounded-lg bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 shadow shadow-neutral-400 outline-none dark:bg-gray-700 dark:placeholder-gray-500'
						/>

						<ul className='bg-background flex flex-col overflow-y-auto  border-2 rounded-lg px-4'>
							{profiles?.map((p: TProfileRow) => (
								<li key={p.id} className='flex items-center justify-between border-b-2 py-2.5'>
									<div className='flex items-center gap-3'>
										<Avatar img={p.avatar_path || ''} />
										<span className='text-sm'>{p.name}</span>
									</div>
									{/* TODO: после того как я убираю галочку, profile не убирается из addProfileArr */}
									<Checkbox onClick={() => handleAddProfile(p)} />
								</li>
							))}
						</ul>

						<div className='flex w-full gap-3 px-4 py-2'>
							<Button
								onClick={() => {
									typeChannel === 'group'
										? handleCreateGroup(addProfileArr)
										: handleCreateDirect(addProfileArr[0]);
								}}
							>
								Create
							</Button>
							<Button onClick={() =>{
								 setOpenList(false)
								 setNameChannel('')
								 }}>Back</Button>
						</div>
					</div>
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
