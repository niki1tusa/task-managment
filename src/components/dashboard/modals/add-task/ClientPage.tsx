'use client';

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

import { Title } from '@/components/ui/Title';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

export default function ClientPage() {
	return (
		<div className='px-5'>
			<div className='flex flex-col gap-1 p-6'>
				<Title>Add Task (client page)</Title>
				<Link href={DASHBOARD_PAGES.DASHBOARD} className='flex gap-3'>
					<ArrowLeftCircle /> <span>Back to Dashboard</span>
				</Link>
				<p>Add task</p>
			</div>
		</div>
	);
}
