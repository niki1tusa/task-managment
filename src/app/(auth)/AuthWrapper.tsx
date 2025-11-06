import Image from 'next/image';

import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble';



interface Props {
	children: React.ReactNode;
}
// This is not a layout, because the layout will be displayed until the authorization check is completed.
export default async function AuthWrapper({ children }: Props) {

	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center gap-10 2xl:text-3xl'>
			<BubbleBackground className='absolute inset-0 z-0 flex items-center justify-center' />
			<div className='z-20 grid h-[70%] w-[50%] grid-cols-2 overflow-hidden rounded-4xl bg-purple-950/80 text-white/90'>
				<div className='flex flex-col gap-5 p-10 shadow'>{children}</div>

				<Image src='/chat.png' alt='chat' width={1100} height={1100} className='h-full w-full' />
			</div>
		</div>
	);
}
