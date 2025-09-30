'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import { Title } from '@/components/ui/Title';
import Textarea from '@/components/ui/field/Textarea';

import { useTaskStore } from '@/store/task.store';

import { useAllTaskWithoutFilter } from '@/hooks/useAllTaskWithoutFilter';
import { useMyTasks } from '@/hooks/useMyTasks';
import { useProfile } from '@/hooks/useProfile';

import TeamTask from './TeamTask';
import TeamTaskPanel from './TeamTaskPanel';
import { getAllProfile } from '@/services/profile/profile-client.service';

export default function TeamPageClient() {
	const [value, setValue] = useState('');
	const { tasks, isPending } = useAllTaskWithoutFilter();
	const [selectTypeTasks, setSelectTypeTasks] = useState<'owner' | 'participants' | 'completed'>(
		'owner'
	);
	const { profile } = useProfile();
	const { activeTask } = useTaskStore();
	const { data: profiles } = useQuery({
		queryKey: ['profiles'],
		queryFn: () => getAllProfile(),
	});

	const taskFiltered = useMemo(() => {
		const query = value
			? tasks?.filter(task => task.title.toLowerCase().includes(value.toLowerCase()))
			: tasks;
		switch (selectTypeTasks) {
			case 'owner':
				return query?.filter(t => t.owner_id === profile?.id);
			case 'completed':
				return query?.filter(t => t.sub_task.every(st => st.is_completed));
			case 'participants':
				return query?.filter(t => t.owner_id !== profile?.id);
			default:
				return query;
		}
	}, [profile, tasks, value, selectTypeTasks]);

	const taskOwner = profiles?.find(profile => profile.id === activeTask?.owner_id);
	return (
		<div className='relative grid h-full grid-cols-[70%_30%] border-l'>
			{/* first col */}
			<div className='flex flex-col gap-2 bg-gray-50 px-5 pt-7 dark:bg-gray-900'>
				{/* header */}
				<Title heading='page'>Team</Title>
				{/* filters */}
				<div>
					<Textarea value={value} setValue={setValue} placeholder='Enter task name...' />
					<Tabs
						value={selectTypeTasks}
						onValueChange={value => setSelectTypeTasks(value as typeof selectTypeTasks)}
						className='mt-5 grid rounded-lg shadow shadow-neutral-400'
					>
						<TabsList className='bg-primary/50 flex w-full'>
							<TabsTrigger
								value='owner'
								className='flex data-[state=active]:text-black data-[state=inactive]:text-white'
							>
								Owner
							</TabsTrigger>
							<TabsTrigger
								value='participants'
								className='flex data-[state=active]:text-black data-[state=inactive]:text-white'
							>
								Participants
							</TabsTrigger>
							<TabsTrigger
								value='completed'
								className='flex data-[state=active]:text-black data-[state=inactive]:text-white'
							>
								Completed
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
				{/* list */}
				<div className='flex max-h-170 flex-col gap-3 overflow-y-auto rounded border-2 p-3 shadow shadow-neutral-400'>
					{taskFiltered?.map(task => (
						<TeamTask task={task} key={task.id} />
					))}
				</div>
			</div>
			{/* second col */}
			<TeamTaskPanel isPending={isPending} taskOwner={taskOwner} />
		</div>
	);
}
