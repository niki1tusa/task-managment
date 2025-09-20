import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, SquarePlus } from 'lucide-react';
import { useState } from 'react';

import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { useModalStore } from '@/store/modals.store';
import { useTaskStore } from '@/store/task.store';

import TeamTaskPanelList from './TeamTaskPanelList';

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
			<div className='flex flex-col px-5 py-5'>
				{activeTask ? (
					<>
						<div className='flex gap-2 items-baseline'>
							<Title>Owner:</Title>
							<span className='text-foreground/60 text-lg'>{taskOwner.name}</span>
						</div>
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

						{/* animated participants list */}
						<div className='mx-2 my-2 min-h-0 flex-1'>
							<AnimatePresence initial={false}>
								{isPartOpen && (
									<motion.div
										key='participants-list'
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.4 }}
										style={{ overflow: 'hidden' }}
									>
										<TeamTaskPanelList
											isPartOpen={isPartOpen}
											activeTask={activeTask}
											isPending={isPending}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* sub task */}
						<div className='flex flex-col border-t pb-1'>
							<Title>Subtask:</Title>
							<div className='flex flex-col gap-1'>
								{activeTask?.sub_task.map(subTask => (
									<div
										className='flex items-center justify-between rounded border bg-white px-2 py-2'
										key={subTask.id}
									>
										<span className='text-sm'>{subTask.title}</span>
										<div
											className={clsx(
												'rounded-sm border p-1 text-sm',
												subTask.is_completed ? 'bg-green-500/20' : 'bg-amber-500/20'
											)}
										>
											{subTask.is_completed ? 'completed' : 'work'}
										</div>
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
