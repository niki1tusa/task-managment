import BtnReturnBack from '@/shared/ui/buttons/BtnReturnBack';

export default function NotFound() {
	return (
		<div className='flex h-screen w-full flex-col items-center justify-center'>
			<h1 className='text-7xl font-bold'>404 | Not found</h1>
			<BtnReturnBack text='Return back' />
		</div>
	);
}
