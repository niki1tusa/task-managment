import SubTaskModal from '@/app/dashboard/@modals/(.)task/[id]/add-sub-task/SubTaskAddForm';

interface Props {
	params: Promise<{ id: string }>;
}
export default async function SubTaskAddModal({ params }: Props) {
	const { id } = await params;

	return <SubTaskModal id={id} />;
}
