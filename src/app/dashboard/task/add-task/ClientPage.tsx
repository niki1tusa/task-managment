'use client';

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

import BackLink from '@/components/ui/BackLink';
import { Title } from '@/components/ui/Title';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

export default function ClientPage() {
	return (
		<div className='px-5'>
			<div className='flex flex-col gap-1 p-6'>
				<Title>Add Task (client page)</Title>
				<BackLink text='Back to Dashboard' />
				<p>Add task</p>
			</div>
		</div>
	);
}
