import { ChevronDown, ChevronUp, SquarePlus, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { Avatar } from '@/components/ui/Avatar';
import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { useModalStore } from '@/store/modals.store';
import { useTaskStore } from '@/store/task.store';

import TeamTaskPanelList from './TeamTaskPanelList';
import clsx from 'clsx';

interface Props {
	isPending: boolean;
	taskOwner: TProfileRow;
}

export default function TeamTaskPanel({ taskOwner, isPending }: Props) {
	const { activeTask } = useTaskStore();
	const [isPartOpen, setIsPartOpen] = useState<boolean>(true);
	const { open } = useModalStore();
	return (
		<div className='border-l shadow shadow-neutral-400'>
			<div className='px-5 pt-7'>
				<Title heading='page'>Task Control Panel</Title>
			</div>
			<div className='my-1 border-b' />
			<div className='flex flex-col gap-2 px-5 py-5'>
				{activeTask ? (
					<>
						<Title>Owner: {taskOwner.name}</Title>
						<div className='flex items-center gap-10'>
							<Title>Participants</Title>
							<div>
								<button
									type='button'
									onClick={() => {
										open('insertTaskParticipants');
									}}
								>
									<SquarePlus />
								</button>
								<button onClick={() => setIsPartOpen(prev => !prev)}>
									{isPartOpen ? <ChevronDown /> : <ChevronUp />}
								</button>
							</div>
						</div>
						{activeTask && (
							<TeamTaskPanelList
								isPartOpen={isPartOpen}
								activeTask={activeTask}
								isPending={isPending}
							/>
						)}
						{/* sub task */}
						<div className='flex flex-col'>
							<Title>Subtask:</Title>
							<div className='flex flex-col gap-1'>
								{activeTask?.sub_task.map(subTask => (
									<div className='bg-white border rounded flex items-center justify-between px-2 py-2' key={subTask.id}>
										<span className='text-sm'>{subTask.title}</span>
										<div className={clsx('p-1 text-sm border rounded-sm',
											subTask.is_completed? 'bg-green-500/20' : 'bg-amber-500/20'
										)}>{subTask.is_completed? 'completed': 'work'}</div>
									</div>
								))}
							</div>
						</div>
					</>
				) : (
					<div className='rounded-md border border-dashed p-6 text-sm text-gray-600'>
						Choose a task.
					</div>
				)}
			</div>
		</div>
	);
}
