import Image from 'next/image';

export function BtnTabLink({ path, onClick }: { path: string; onClick?: () => void }) {
	return (
		<button
			type='button'
			onClick={onClick}
			className='bg-background hover:bg-background/90 flex items-center justify-center rounded-lg border px-5 py-3 transition-colors duration-200'
		>
			<Image src={path} alt='google' width={35} height={35} />
		</button>
	);
}
