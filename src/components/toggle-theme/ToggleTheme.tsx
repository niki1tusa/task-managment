'use client';

import { Moon, SunDim } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ToggleTheme = () => {
	const { theme, setTheme } = useTheme();
	
	return (
		<button
			className='text-center rounded-full bg-white px-1 py-1 transition-colors shadow shadow-neutral-400'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'dark' ? <Moon className='text-sky-800' size={30} /> : <SunDim className='text-yellow' size={30} />}
		</button>
	);
};
