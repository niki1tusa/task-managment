import TaskModal from '@/components/dashboard/modals/edit-task/TaskEdit.modal';

interface Props {
	params: Promise<{ id: string }>;
}
export default async function TaskEditModal({ params }: Props) {
	const { id } = await params;
	return <TaskModal id={id} />;
}
