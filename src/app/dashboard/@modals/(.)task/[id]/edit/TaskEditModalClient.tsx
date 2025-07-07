import TaskModal from '@/components/dashboard/modals/TaskEditModal';

interface Props {
	id: string;
}
export default function TaskEditModalClient({ id }: Props) {
	return (
		<TaskModal id={id}>
			<h2 className='flex items-center justify-center font-semibold'>Edit Task "{id}"</h2>
		</TaskModal>
	);
}
