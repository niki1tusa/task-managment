import type { Metadata } from 'next';

import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/shared/constants/seo-constants';

import HomeClient from '@/pages/HomeClient';

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
	return <HomeClient />;
}
