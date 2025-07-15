import EditClient from "@/components/dashboard/modals/edit-task/EditClient";
import TaskEditForm from "@/components/dashboard/modals/edit-task/form/TaskEditForm";


interface Props {
	params: Promise<{ id: string }>;
}
export default async function TaskEditPage({ params }: Props) {
	const { id } = await params;

	return <EditClient id={id} />;
}
