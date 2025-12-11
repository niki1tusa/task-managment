import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeItem = ({ type }: { type: string }) => {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return null;
	}

	return (
		<button
			type='button'
			onClick={() => setTheme(type.toLowerCase())}
			className={clsx(
				'text-gray hover:text-primary dark:hover:text-white flex items-center gap-2 rounded-sm px-3 py-1 text-sm transition-colors duration-300'
			)}
		>
			<div className='font-medium transition-colors flex items-center gap-2'>
				 <div className={clsx('h-2 w-2 bg-gray rounded-full opacity-0 transition-opacity',  theme === type.toLowerCase() && 'opacity-100')}/>
			<div>
                {type}
				{type.toLowerCase() === 'system' && (
					<span className='ml-1 text-xs text-gray-500'>({resolvedTheme})</span>
				)}
                </div>	
			</div>
		</button>
	);
};
