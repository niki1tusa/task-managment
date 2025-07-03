import TaskModal from '@/components/dashboard/modal/TaskModal';

interface Props {
	id: string;
}
export default function TaskEditModalClient({ id }: Props) {
	return (
		<TaskModal>
			<div>Task id: {id}</div>
		</TaskModal>
	);
}
