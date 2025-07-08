import Image from "next/image";

export function Avatar({ id, img }: { id: string; img: string }) {
	return (
		<div
			key={id}
			className='bg-primary flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border shadow shadow-neutral-400'
		>
			<Image src={img} alt='user' width={36} height={36} />
		</div>
	);
}