import Image from "next/image";

export function BtnTabLink({ path, onClick }: { path: string; onClick?: () => void }) {
	return (
		<button
			onClick={onClick}
			className='bg-background hover:bg-background/90 flex  items-center justify-center rounded-lg border py-3 px-5 transition-colors duration-200 '
		>
			<Image src={path} alt='google' width={33} height={33} />
		</button>
	);
}