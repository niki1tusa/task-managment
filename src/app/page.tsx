import type { Metadata } from 'next';
import Link from 'next/link';

import { GradientText } from '@/components/animate-ui/text/gradient';

import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/constants/seo.constants';

import { PUBLIC_PAGES } from '@/config/public-page.config';

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
		<main className='bg-background text-foreground flex min-h-screen flex-col'>
			{/* Header */}
			<header className='mx-5 mt-6 flex items-center justify-around text-lg'>
				<GradientText className='text-2xl font-bold' text='Task Hub' />
				<Link
					href={PUBLIC_PAGES.LOGIN}
					className='text-primary font-medium transition-all duration-150 hover:underline'
				>
					<GradientText text='Login' />
				</Link>
			</header>

			{/* Hero */}
			<section className='mt-20 flex flex-col items-center justify-center px-6 text-center'>
				<h1 className='max-w-3xl text-4xl leading-tight font-bold md:text-6xl'>
					Organize your tasks effortlessly
				</h1>
				<p className='text-muted-foreground mt-4 max-w-xl text-lg'>
					Task Hub helps you plan, track and collaborate — all in one place.
				</p>
				<Link
					href={PUBLIC_PAGES.LOGIN}
					className='bg-primary hover:bg-primary/90 mt-8 rounded-xl px-6 py-3 text-base font-semibold text-white transition'
				>
					Get Started
				</Link>
			</section>

			{/* Why Us Section */}
			<section className='mt-32 px-6 text-center'>
				<h2 className='mb-6 text-2xl font-semibold'>Why Task Hub?</h2>
				<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3'>
					<div className='bg-muted rounded-xl p-6 shadow-sm'>
						<h3 className='mb-2 text-lg font-semibold'>Fast & Simple</h3>
						<p className='text-muted-foreground text-sm'>
							Clean interface focused on productivity.
						</p>
					</div>
					<div className='bg-muted rounded-xl p-6 shadow-sm'>
						<h3 className='mb-2 text-lg font-semibold'>Team Collaboration</h3>
						<p className='text-muted-foreground text-sm'>
							Invite your team and work together in real time.
						</p>
					</div>
					<div className='bg-muted rounded-xl p-6 shadow-sm'>
						<h3 className='mb-2 text-lg font-semibold'>Custom Workflows</h3>
						<p className='text-muted-foreground text-sm'>
							Adapt Task Hub to your unique workflow with ease.
						</p>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='text-muted-foreground mt-32 mb-10 text-center text-xs'>
				&copy; {new Date().getFullYear()} Task Hub. All rights reserved.
			</footer>
		</main>
	);
}
