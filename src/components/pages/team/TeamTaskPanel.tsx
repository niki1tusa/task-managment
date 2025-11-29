import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, SquarePlus } from 'lucide-react';
import { useState } from 'react';

import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task-types';

import { useModalStore } from '@/store/modals-store';
import { useTaskStore } from '@/store/task-store';

import TeamSubtaskPanel from './TeamSubtaskPanel';
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
		<div className=' border-l bg-side'>
			<div className='px-5 pt-7'>
				<Title heading='page'>Task Control Panel</Title>
			</div>
			<div className='my-1 border-b' />
			<div className='flex flex-col px-5 py-5'>
				{activeTask ? (
					<>
						<div className='flex items-baseline gap-2'>
							<Title>Owner:</Title>
							<span className='text-foreground/60 text-lg'>{taskOwner ? taskOwner.name : ''}</span>
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
						<div className='mx-2 my-2 min-h-0 flex-1 shadow shadow-neutral-400 dark:shadow-none'>
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
										<TeamTaskPanelList activeTask={activeTask} isPending={isPending} />
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* sub task */}
						<TeamSubtaskPanel activeTask={activeTask} />
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
