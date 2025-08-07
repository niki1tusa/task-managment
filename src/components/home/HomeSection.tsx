export function HomeSection({ text1, text2 }: { text1: string; text2: string }) {
	return (
		<div className='bg-muted rounded-xl p-6 shadow-sm transition-all duration-500 hover:scale-105  hover:shadow-neutral-400'>
			<h3 className='mb-2 text-lg font-semibold'>{text1}</h3>
			<p className='text-muted-foreground text-sm'>{text2}</p>
		</div>
	);
}