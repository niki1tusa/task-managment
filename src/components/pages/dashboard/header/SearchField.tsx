import { Search } from 'lucide-react';

export const SearchField = () => {
	return (
		<span className='bg-background text-gray shadow-default flex items-center gap-2 rounded-4xl px-2'>
			<Search className='text-foreground' />
			<input
				type='text'
				className='w-[300px] px-2 py-2 outline-none'
				placeholder='Search something...'
				autoComplete='off'
			/>
		</span>
	);
};
