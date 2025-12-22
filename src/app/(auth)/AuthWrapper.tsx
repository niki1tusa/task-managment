'use client';

import Image from 'next/image';

import { BubbleBackground } from '@/shared/ui/animate-ui/backgrounds/bubble';

// This is not a layout, because the layout will be displayed until the authorization check is completed.
export default function AuthWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center gap-10 2xl:text-3xl'>
			<BubbleBackground className='absolute inset-0 z-0 flex items-center justify-center' />
			<div className='z-20 grid h-[70%] w-[50%] grid-cols-[100%_0] overflow-hidden rounded-4xl bg-purple-950/80 text-white/90 lg:grid-cols-2'>
				<div className='flex flex-col gap-5 p-10 shadow'>{children}</div>
				<div className='relative hidden lg:block xl:min-h-[600px]'>
					<Image src={'/chat.png'} alt='chat' sizes='hidden 2xl:block object-contain' fill />
					<Image src={'/chat2.png'} alt='chat' sizes='2xl:hidden block object-contain' fill />
				</div>
			</div>
		</div>
	);
}
