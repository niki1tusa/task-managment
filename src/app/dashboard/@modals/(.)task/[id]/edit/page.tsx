import { TASK_EDIT_FIELDS } from "@/components/dashboard/modals/edit-task/task.edit.data";
import TaskEditForm from "@/components/dashboard/modals/edit-task/TaskEditForm";

interface Props {
	params: Promise<{ id: string }>;
}
export default async function TaskEditModal({ params }: Props) {
	const { id } = await params;
	return <TaskEditForm id={id} formElement={TASK_EDIT_FIELDS}/>
}
