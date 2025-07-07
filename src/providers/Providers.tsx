import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
// import { Provider } from 'react-redux';
export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
	return (
		// <Provider store={store}>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				{children}
			</ThemeProvider>
		// </Provider>
	);
};
