'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { type ReactNode, useState } from 'react';

import { Toaster } from '@/shared/ui/Toaster';

import { ModalProvider } from './ModalProvider';

export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				<Toaster />
				<ModalProvider />
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
};
