import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { SquareMinus, SquarePlus } from 'lucide-react';

import { Checkbox } from '@/components/animate-ui/base/checkbox';
import { Title } from '@/components/ui/Title';

import type { TTask } from '@/shared/types/task/task.types';

import { useModalStore } from '@/store/modals.store';
import { useSubTaskStore } from '@/store/subtask.store';

import { useProfile } from '@/hooks/useProfile';

import { getAllProfile } from '@/services/profile/profile-client.service';

export default function TeamSubtaskPanel({ activeTask }: { activeTask: TTask }) {
	const { profile } = useProfile();
	const { setActiveSubTask, activeSubTask } = useSubTaskStore();
	const { data } = useQuery({
		queryKey: ['profiles'],
		queryFn: () => getAllProfile(),
	});
	const { open } = useModalStore();
	const responsibleProfile = data?.find(p => p.id === activeSubTask?.profile_id);
	return (
		<div className='flex flex-col border-t pb-1'>
			<Title>Subtask:</Title>
			<div className='mx-2 flex flex-col gap-1'>
				{activeTask?.sub_task?.map(subTask => (
					<div key={subTask.id} className='flex flex-col'>
						<button
							onClick={() => setActiveSubTask(subTask)}
							className={clsx(
								activeSubTask?.id === subTask.id && 'border-sky-500 transition-all',
								'flex items-center justify-between rounded border bg-white px-2 py-2'
							)}
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
						</button>
						{activeSubTask?.id === subTask.id && (
							<>
								<motion.div
									initial={{ height: 'auto', opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.4 }}
									style={{ overflow: 'hidden' }}
									className={clsx(
										'mt-1 ml-5 flex items-center justify-between rounded px-2 py-1.5 text-left text-sm shadow shadow-neutral-400',
										responsibleProfile ? 'bg-green-500/20' : 'bg-amber-500/20'
									)}
								>
									<div className='flex items-center gap-2'>
										<span>Responsible for the subtask:</span>
										{responsibleProfile ? <span>{responsibleProfile?.name}</span> : ' not assigned'}
									</div>
									<div className='flex gap-1'>
										<button
											type='button'
											className={clsx(
												(profile?.id !== activeTask.owner_id || subTask.profile_id !== null) &&
													'text-gray'
											)}
											disabled={profile?.id !== activeTask.owner_id || subTask.profile_id !== null}
											onClick={() => {
												open('addResponseProfileForSubTask');
											}}
										>
											<SquarePlus />
										</button>
										<button
											type='button'
											className={clsx(
												(profile?.id !== activeTask.owner_id || subTask.profile_id === null) &&
													'text-gray'
											)}
											disabled={profile?.id !== activeTask.owner_id || subTask.profile_id === null}
											onClick={() => open('removeResponseProfileForSubTask', subTask)}
										>
											<SquareMinus />
										</button>
									</div>
								</motion.div>
								{responsibleProfile && (
									<motion.div
										initial={{ height: 'auto', opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.4 }}
										style={{ overflow: 'hidden' }}
										className={clsx(
											'mt-1 ml-5 flex items-center justify-between rounded px-2 py-1.5 text-left text-sm shadow shadow-neutral-400',
											subTask.is_completed ? 'bg-green-500/20' : 'bg-amber-500/20'
										)}
									>
										<div className='flex items-center gap-2'>
											<span>Mark of completion:</span>
											<Checkbox className='border-2 border-black/50' />
										</div>
									</motion.div>
								)}
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
