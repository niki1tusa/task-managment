import type { Metadata } from 'next';

import ClientTaskPage from './ClientTaskPage';
import { getServerAllTask } from '@/entities/task/api/task-server-service';

export async function generateMetadata(params: { id: string }): Promise<Metadata> {
	const { id } = params;
	return { title: `Task ${id}` };
}

interface Props {
	params: Promise<{ id: string }>;
}
export default async function TaskPage({ params }: Props) {
	const { id } = await params;
	const tasks = await getServerAllTask();
	if (!tasks.data) return null;
	return <ClientTaskPage id={id} tasks={tasks.data} />;
}
