import type { Metadata } from 'next';

import ClientTaskPage from './ClientTaskPage';
import { getServerAllTask } from '@/entities/task/api/task-server-service';

export const metadata: Metadata = {
	title: 'Task',
};

interface Props {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
	const { id } = await params;
	const tasks = await getServerAllTask();
	if (!tasks.data) return null;
	return <ClientTaskPage id={id} tasks={tasks.data} />;
}
