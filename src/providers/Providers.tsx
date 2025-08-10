'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { type ReactNode, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { ToggleTheme } from '@/components/ui/toggle-theme/ToggleTheme';

export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				<div className='absolute top-5 right-5 z-50'>
					<ToggleTheme />
				</div>
				<ToastContainer />
				{children}
			</ThemeProvider>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	);
};
