import type { ITask } from '@/shared/types/task.types';

interface Props {
	task: ITask;
}
export function ListSubTask({ task }: Props) {
	return (
		<div className='text-md flex flex-col gap-4'>
			{task.subTask.map((subtask, i) => (
				<div key={subtask.id} className='flex w-[80%] gap-1 border-b-2'>
					<span>{i}&#41;</span>
					<div className='flex flex-col gap-1'>
						<span>
							<i>Subtask name: </i>
							{subtask.title}
						</span>
						<span>
							<i>Subtask status:</i> {subtask.isCompleted ? 'Completed' : 'In process'}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}
