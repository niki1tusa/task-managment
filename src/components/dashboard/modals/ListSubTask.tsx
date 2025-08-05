import type { TTask } from '@/shared/types/task/task.types';

interface Props {
	task: TTask;
}
export function ListSubTask({ task }: Props) {
	return (
		<div className='text-md flex flex-col gap-4'>
			{task.sub_task.map((subtask, i) => (
				<div key={`${subtask.id}-${i}`} className='flex w-[80%] gap-1 border-b-2'>
					<span>{i + 1}&#41;</span>
					<div className='flex flex-col gap-1'>
						<span>
							<i>Subtask name: </i>
							{subtask.title}
						</span>
						<span>
							<i>Subtask status:</i> {subtask.is_completed ? 'Completed' : 'In process'}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}
