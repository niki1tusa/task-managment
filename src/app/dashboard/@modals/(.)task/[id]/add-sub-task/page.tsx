import SubTaskModal from '@/components/dashboard/modals/add-sub-task/SubTaskAdd.modal';


interface Props {
	params: Promise<{ id: string }>;
}
export default async function SubTaskAddModal({ params }: Props) {
	const { id } = await params;

	return <SubTaskModal id={id} />;
}
