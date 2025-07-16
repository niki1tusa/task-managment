import TaskEditForm from '@/app/dashboard/@modals/(.)task/[id]/edit/TaskEditForm';
import { TASK_EDIT_FIELDS } from '@/app/dashboard/@modals/(.)task/[id]/edit/task.edit.data';

interface Props {
	params: Promise<{ id: string }>;
}
export default async function TaskEditModal({ params }: Props) {
	const { id } = await params;
	return <TaskEditForm id={id} formElement={TASK_EDIT_FIELDS} />;
}
