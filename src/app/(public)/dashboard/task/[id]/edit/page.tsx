import { PAGE } from "@/config/page.config";
import { ArrowDownLeft } from "lucide-react";
import Link from "next/link";

interface Props {
	params: Promise<{ id: string }>;
}
export default async function TaskEditPage({ params }: Props) {
	const {id} = await params
	return (
		<div >
			<div className=' p-6'>
				<h2>Edit Task</h2>
<Link href={PAGE.DASHBOARD} className="bg-amber-700"> Back to Dashboard</Link>
<p>task id {id}</p>
			</div>
		</div>
	);
}
