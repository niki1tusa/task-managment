'use client';

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/dashboardDASHBOARD_PAGEconfig';

export default function ClientPage() {
	return (
		<div className='px-5'>
			<div className='flex flex-col gap-1 p-6'>
				<Title>Add Task (client page)</Title>
				<Link href={DASHBOARD_PAGEDASHBOARD} className='flex gap-3'>
					<ArrowLeftCircle /> <span>Back to Dashboard</span>
				</Link>
				<p>Add task</p>
			</div>
		</div>
	);
}
