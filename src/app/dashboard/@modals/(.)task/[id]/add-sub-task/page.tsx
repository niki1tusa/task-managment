import { SubTaskAddForm } from "./SubTaskAddForm";

interface Props {
	params: Promise<{ id: string }>;
}
export default async function SubTaskAddModal({ params }: Props) {
	const { id } = await params;

	return <SubTaskAddForm id={id} />;
}
