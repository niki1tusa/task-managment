import { Search } from "lucide-react";

export const SearchField = () => {
	return (
		<span className='flex items-center gap-2 px-2 bg-white dark:bg-dark rounded-4xl text-gray shadow shadow-neutral-400'>
			<Search className='text-dark dark:text-white' />
			<input
				type='text'
				className='px-2 py-2 outline-none w-[300px] '
				placeholder='Search something...'
			/>
		</span>
	);
};
