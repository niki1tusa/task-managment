'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble';
import { ZRegistrationScheme } from '@/components/dashboard/modals/scheme.zod';
import Form from '@/components/ui/Form';
import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/page.config';

export default function HomeClient() {
	const [authCondition, setAuthCondition] = useState('register');
	return (
		<>
			<div className='flex h-full w-full flex-col items-center justify-center gap-10 2xl:text-3xl'>
				<BubbleBackground className='absolute inset-0 z-0 flex items-center justify-center' />
				{/* <GradientBackground className='absolute inset-0 z-0 flex items-center justify-center' /> */}
				<div className='z-20 grid h-[70%] w-[50%] grid-cols-2 overflow-hidden rounded-4xl bg-purple-950/80 text-white/90'>
					<div className='flex flex-col gap-5 p-10'>
						<div>
							<Title>
								<b className='font-playfair text-3xl 2xl:text-6xl'>Wellcom on task managment</b>
							</Title>
							<br />
							<span className='text-[0.7rem] leading-0.5 2xl:text-[18px]'>
								we save your time and improve the organization of projects.
							</span>
						</div>
						{authCondition === 'register'? (
							<div className='flex flex-col gap-2'>
								<Form
									isNameField={true}
									isEmailField={true}
									isPassowrdField={true}
									zodScheme={ZRegistrationScheme}
									btnText='Submit'
									btnClassName='bg-white/40 py-1.5 hover:text-purple-950 duration-300 	text-sm px-3 hover:bg-white/60 w-[30%] rounded-4xl  text-white transition-colors'
								/>
								<div className='text-[0.6em]'>Already have on accaunt? <button className='text-cyan-400' onClick={()=>setAuthCondition('login')}>Sign In</button> </div>
								<Link href={PAGE.DASHBOARD} className='border-b-2 text-sm'>
									<b>CLICK ME </b>(for go to the Dashboard page)
								</Link>
							</div>
						): 							<div className='flex flex-col gap-2'>
								<Form
								
									isEmailField={true}
									isPassowrdField={true}
									zodScheme={ZRegistrationScheme}
									btnText='Submit'
									btnClassName='bg-white/40 py-1.5 hover:text-purple-950 duration-300 	text-sm px-3 hover:bg-white/60 w-[30%] rounded-4xl  text-white transition-colors'
								/>
								<div className='text-[0.6em]'>Don't have on accaunt? <button className='text-cyan-400' onClick={()=>setAuthCondition('register')}>Sign Up</button> </div>
								<Link href={PAGE.DASHBOARD} className='border-b-2 text-sm'>
									<b>CLICK ME </b>(for go to the Dashboard page)
								</Link>
							</div>}
					</div>

					<Image src='/chat.jpg' alt='chat' width={1100} height={1100} className='h-full w-full' />
				</div>
			</div>
		</>
	);
}
