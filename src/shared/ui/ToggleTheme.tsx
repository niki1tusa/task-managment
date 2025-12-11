'use client';

import { Moon, SunDim } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ToggleTheme = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<button
			className='bg-background shadow-default rounded-full px-1 py-1 text-center transition-colors duration-1000'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'dark' ? <Moon size={30} /> : <SunDim className='text-yellow' size={30} />}
		</button>
	);
};
