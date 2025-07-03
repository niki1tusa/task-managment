import TaskEditModalClient from './TaskEditModalClient';

interface Props {
	params: Promise<{ id: string }>;
}
export default async function TaskEditModal({ params }: Props) {
	const { id } = await params;
	console.log('hi this is modals!!!!!!!!1')
	return <TaskEditModalClient id={id} />;
}
