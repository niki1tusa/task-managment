'use client';

import { Moon, SunDim } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ToggleTheme = () => {
	const { theme, setTheme } = useTheme();

	return (
		<button
			className='bg-background rounded-full px-1 py-1 text-center shadow shadow-neutral-600 transition-colors duration-1000'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'dark' ? <Moon size={30} /> : <SunDim className='text-yellow' size={30} />}
		</button>
	);
};
