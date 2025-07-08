import ClientPage from "@/components/dashboard/modals/add-sub-task/ClientPage";

interface Props {
	params: Promise<{ id: string }>;
}
export default async function SubTaskPage({ params }: Props) {
	const { id } = await params;

	return <ClientPage id={id} />;
}
