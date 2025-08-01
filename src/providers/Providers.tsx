'use client'
import { ThemeProvider } from 'next-themes';
import { useState, type ReactNode } from 'react';
import {  QueryClient, QueryClientProvider} from '@tanstack/react-query'

export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
	 const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
};
