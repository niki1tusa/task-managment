'use client';

import Image from 'next/image';

import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble';
import { Title } from '@/components/ui/Title';

import { RegisterForm } from './form/RegisterForm';

export default function RegisterClient() {
	return (
		<div className='flex h-full w-full flex-col items-center justify-center gap-10 2xl:text-3xl'>
			<BubbleBackground className='absolute inset-0 z-0 flex items-center justify-center' />
			<div className='z-20 grid h-[70%] w-[50%] grid-cols-2 overflow-hidden rounded-4xl bg-purple-950/80 text-white/90'>
				<div className='flex flex-col gap-5 p-10'>
					<div>
						<Title>
							<b className='font-playfair text-3xl 2xl:text-6xl'>Welcome on task management</b>
						</Title>
						<br />
						<span className='text-[0.7rem] leading-0.5 2xl:text-[1rem]'>
							we save your time and improve the organization of projects.
						</span>
					</div>

					<RegisterForm linkText='Sign In' />
				</div>

				<Image src='/chat.jpg' alt='chat' width={1100} height={1100} className='h-full w-full' />
			</div>
		</div>
	);
}
