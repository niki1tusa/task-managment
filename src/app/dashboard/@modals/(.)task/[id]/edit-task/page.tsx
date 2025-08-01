import {TaskEditForm }from '@/app/dashboard/@modals/(.)task/[id]/edit-task/TaskEditForm';

interface Props {
	params: Promise<{ id: string }>;
}
export default async function TaskEditModal({ params }: Props) {
	const { id } = await params;
	return <TaskEditForm id={id}  />;
}
