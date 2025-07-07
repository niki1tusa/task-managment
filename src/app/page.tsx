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
		<div className='flex items-center justify-center'>
			<Link href={PAGE.DASHBOARD}>
				<b>CLICK ME </b>(for go Dashboard page)
			</Link>
			
		</div>
	);
}
