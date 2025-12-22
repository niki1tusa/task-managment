import type { Metadata } from 'next';
import Link from 'next/link';

import { PUBLIC_PAGES } from '@/shared/config/public-page-config';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/shared/constants/seo-constants';
import FooterHomePage from '@/shared/ui/FooterHomePage';
import LinkComponent from '@/shared/ui/LinkComponent';
import ToggleThemeClient from '@/shared/ui/ToggleThemeClient';
import { GradientText } from '@/shared/ui/animate-ui/text/gradient';

import { HomeSection } from '../widgets/home/HomeSection';

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
		<main className='bg-background text-foreground relative flex h-full flex-col lg:max-h-screen'>
			{/* Header */}
			<header className='mx-5 mt-6 flex items-center justify-around text-lg'>
				<GradientText className='xs:text-2xl text-3xl font-bold' text='Task Hub' />
				<div className='xs:flex hidden items-center gap-2'>
					<LinkComponent path={PUBLIC_PAGES.LOGIN}>
						<GradientText text='Login' className='font-medium' />
					</LinkComponent>
					<LinkComponent path={PUBLIC_PAGES.REGISTER}>
						<GradientText text='Register' className='font-medium' />
					</LinkComponent>
				</div>
			</header>
			<ToggleThemeClient />
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
					className='bg-primary hover:bg-primary/90 shadow-default mt-8 rounded-xl px-6 py-3 text-base font-semibold text-white transition hover:text-white/70 dark:border-2'
				>
					Get Started
				</Link>
			</section>

			{/* Why Us Section */}
			<section className='mt-12 px-6 text-center'>
				<h2 className='mb-6 text-2xl font-semibold'>Why Task Hub?</h2>
				<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3'>
					<HomeSection text1='Fast & Simple' text2='Clean interface focused on productivity.' />
					<HomeSection
						text1='Team Collaboration'
						text2='Invite your team and work together in real time.'
					/>
					<HomeSection
						text1='Custom Workflows'
						text2='Adapt Task Hub to your unique workflow with ease.'
					/>
				</div>
			</section>
			{/* Footer */}
			<FooterHomePage  />
		</main>
	);
}
