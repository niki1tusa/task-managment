import { Trash2Icon } from 'lucide-react';

import { Avatar } from '@/components/ui/Avatar';

import type { TTask } from '@/shared/types/task/task.types';

interface Props {
	isPartOpen: boolean;
	activeTask: TTask;
	isPending: boolean;
}

export default function TeamTaskPanelList({ isPartOpen, activeTask, isPending }: Props) {
	return (
		<div className='flex h-full min-h-0 flex-col gap-1 overflow-y-auto rounded border bg-gray-50 p-2 py-2 shadow shadow-neutral-400 dark:bg-gray-900 dark:shadow-none'>
			{activeTask?.task_participants
				?.flatMap(p => (p.profile ? [p.profile] : []))
				.map(profile => (
					<div
						key={profile!.id}
						className='group flex items-center justify-between gap-2 px-2 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
					>
						<div className='relative flex items-center gap-2 truncate p-1'>
							<div className='relative'>
								<Avatar img={profile!.avatar_path} isPartySide={true} />
								<div className='absolute top-[80%] right-0 h-1.5 w-1.5 animate-pulse rounded-full border border-green-900 bg-green-500 2xl:h-2 2xl:w-2' />
							</div>
							<span className='group-hover:text-primary relative text-[12px] transition-colors 2xl:text-sm dark:group-hover:text-white'>
								{profile!.name}
							</span>
						</div>

						{/* безопаснее с optional chaining */}
						{activeTask?.owner_id === profile!.id && (
							<span className='ml-2 rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-semibold text-black'>
								OWNER
							</span>
						)}

						<button
							onClick={e => {
								e.stopPropagation();
								open('deleteProfileFromTaskParticipants', profile);
							}}
							disabled={isPending}
							title='Remove user from a channel'
							type='button'
						>
							<Trash2Icon
								size={18}
								className='text-red-400 opacity-0 transition-opacity group-hover:opacity-100'
							/>
						</button>
					</div>
				))}
		</div>
	);
}
