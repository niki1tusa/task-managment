import ClientPage from '@/components/dashboard/modals/edit-task/ClientPage';


interface Props {
	params: Promise<{ id: string }>;
}
export default async function TaskEditPage({ params }: Props) {
	const { id } = await params;

	return <ClientPage id={id} />;
}
