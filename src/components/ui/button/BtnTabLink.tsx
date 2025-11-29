import Image from 'next/image';

export function BtnTabLink({ path, onClick }: { path: string; onClick?: () => void }) {
	return (
		<button
			type='button'
			onClick={onClick}
			className='bg-background dark:bg-white dark:hover:bg-white/50 hover:bg-background/90 flex items-center justify-center rounded-lg border px-1 py-1.5 transition-colors duration-200'
		>
			<div className='2xl:w-[5vw] 2xl:h-[5vh]  w-[4vw] h-[3vh] relative'>
				<Image src={path} alt='google' fill className='absolute shrink-0'/>
			</div>
			
		</button>
	);
}
