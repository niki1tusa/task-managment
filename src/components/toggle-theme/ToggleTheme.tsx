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
			{theme === 'dark' ? <Moon className='text-dark' size={30} /> : <SunDim size={30} />}
		</button>
	);
};
