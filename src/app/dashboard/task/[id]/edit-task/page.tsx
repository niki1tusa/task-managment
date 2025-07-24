import EditClient from '@/app/dashboard/task/[id]/edit-task/EditClient';

interface Props {
	params: Promise<{ id: string }>;
}
export default async function TaskEditPage({ params }: Props) {
	const { id } = await params;

	return <EditClient id={id} />;
}
