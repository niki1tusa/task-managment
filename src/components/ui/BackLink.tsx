import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';
import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

export default function BackLink({text}:{text?: string}) {
	return (
		<Link href={DASHBOARD_PAGES.DASHBOARD} className='mt-5 flex items-center gap-3'>
			<ArrowLeftCircle /> <span className='border-b-2'>{text}</span>
		</Link>
	);
}
