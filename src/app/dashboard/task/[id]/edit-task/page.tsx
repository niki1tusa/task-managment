import {EditClient} from '@/app/dashboard/task/[id]/edit-task/EditClient';
import { getServerAllTask } from '@/services/tasks/task-server.service';

interface Props {
	params: Promise<{ id: string }>;
}
export default async function TaskEditPage({ params }: Props) {
	const { id } = await params;
	const tasks = await  getServerAllTask()
	return <EditClient id={id}  tasks={tasks.data || []}/>;
}
