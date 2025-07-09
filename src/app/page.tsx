import type { Metadata } from 'next';
import Link from 'next/link';

import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/constants/seo.constants';

import { PAGE } from '@/config/page.config';

export const metadata: Metadata = {
	title: `${SITE_NAME} | Home`,
	description: SITE_DESCRIPTION,
	openGraph: {
		title: `${SITE_NAME} | Home`,
		description: SITE_DESCRIPTION,
		url: `${SITE_URL}/`,
		siteName: SITE_NAME,
		images: [
			{
				url: OG_IMAGE,
				width: 1200,
				height: 630,
				alt: 'Task Hub Dashboard',
			},
		],
		type: 'website',
	},
};

export default function Home() {
	return (
		<div className='mt-10 flex h-full w-full flex-col items-center gap-10 text-3xl'>
			<nav className='flex flex-col gap-5 w-[30%] justify-center items-center h-full'>
				<Link href={PAGE.DASHBOARD} className='border-b-2'>
					<b>CLICK ME </b>(for go to the Dashboard page)
				</Link>{' '}
				<Link className='border-b-2' href={PAGE.LOGIN}>
					Login
				</Link>
			</nav>
		</div>
	);
}
