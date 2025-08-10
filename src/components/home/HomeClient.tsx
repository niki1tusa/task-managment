import Link from 'next/link';

import { PUBLIC_PAGES } from '@/config/public-page.config';

import { GradientText } from '../animate-ui/text/gradient';

import { HomeSection } from './HomeSection';

export default function HomeClient() {
	return (
		<main className='bg-background text-foreground flex min-h-screen flex-col'>
			{/* Header */}
			<header className='mx-5 mt-6 flex items-center justify-around text-lg'>
				<GradientText className='text-2xl font-bold' text='Task Hub' />
				<div className='flex items-center gap-2'>
					<Link
						href={PUBLIC_PAGES.LOGIN}
						className='rounded-xl border px-3 py-0.5 shadow shadow-neutral-400'
					>
						<GradientText text='Login' className='font-medium' />
					</Link>
					<i className='text-[1rem] font-medium'></i>
					<Link
						href={PUBLIC_PAGES.REGISTER}
						className='rounded-xl border px-3 py-0.5 shadow shadow-neutral-400'
					>
						<GradientText text='Register' className='font-medium' />
					</Link>
				</div>
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
					className='bg-primary hover:bg-primary/90 mt-8 rounded-xl px-6 py-3 text-base font-semibold text-white transition hover:text-white/70 dark:border-2'
				>
					Get Started
				</Link>
			</section>

			{/* Why Us Section */}
			<section className='mt-32 px-6 text-center'>
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
			<footer className='text-muted-foreground mt-32 mb-10 text-center text-xs'>
				&copy; {new Date().getFullYear()} Task Hub. All rights reserved.
			</footer>
		</main>
	);
}
