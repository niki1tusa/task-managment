'use client';

import Image from 'next/image';
import Link from 'next/link';

import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble';
import { ZRegistrationScheme } from '@/components/dashboard/modals/scheme.zod';
import Form from '@/components/ui/Form';
import { Title } from '@/components/ui/Title';

import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/constants/seo.constants';

import { PAGE } from '@/config/page.config';

export default function HomeClient() {
	return (
		<>
			<div className='flex h-full w-full flex-col items-center justify-center gap-10 text-3xl'>
				<BubbleBackground className='absolute inset-0 z-0 flex items-center justify-center' />
				{/* <GradientBackground className='absolute inset-0 z-0 flex items-center justify-center' /> */}
				<div className='z-20 grid h-[60%] w-[50%] grid-cols-2 overflow-hidden rounded-4xl bg-purple-950/80 text-white/90'>
					<div className='p-10'>
						<Title>
							<b className='font-playfair text-6xl'>Wellcom on task managment</b>
						</Title>
						<br /><span className='text-[18px]'>we save your time and improve the organization of projects.
							</span> 
						<div>
							<Form
								isTitleField={true}
								isEmailField={true}
								isPassowrdField={true}
								zodScheme={ZRegistrationScheme}
							/>
							<Link href={PAGE.DASHBOARD} className='border-b-2'>
								<b>CLICK ME </b>(for go to the Dashboard page)
							</Link>
							<Link className='border-b-2' href={PAGE.LOGIN}>
								Login
							</Link>
						</div>
					</div>
					<Image src='/chat.jpg' alt='chat' width={1100} height={1100} className='h-full w-full' />
				</div>
			</div>
		</>
	);
}
