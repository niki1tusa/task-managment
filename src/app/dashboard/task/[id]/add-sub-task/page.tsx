import {ClientPage} from '@/app/dashboard/task/[id]/add-sub-task/ClientPage';
import { getServerAllTask } from '@/services/tasks/task-server.service';

interface Props {
	params: Promise<{ id: string }>;
}
export default async function SubTaskPage({ params }: Props) {
	const { id } = await params;
	const tasks = await getServerAllTask()
	return <ClientPage id={id} tasks={tasks.data || []}/>;
}
