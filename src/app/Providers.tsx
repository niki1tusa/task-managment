import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

export const Provider = ({ children }: { children: ReactNode }) => {
	return (
		<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
			{children}
		</ThemeProvider>
	);
};
