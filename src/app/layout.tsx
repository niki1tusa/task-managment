import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';

import { SITE_NAME } from '@/constants/seo.constants';

import { ProviderWrapper } from '../providers/Providers';

import './globals.css';
import { ToastContainer } from 'react-toastify';

const poppins = Poppins({
	variable: '--font-poppins-sans',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
const playfairDisplay = Playfair_Display({
	variable: '--font-playfair',
	subsets: ['latin'],
});
export const metadata: Metadata = {
	icons: {
		icon: '/favicon/favicon.svg',
		shortcut: '/favicon/favicon.svg',
	},
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: 'This is gentle app for your management.',
};

export default function RootLayout({
	modals,
	children,
}: Readonly<{
	children: React.ReactNode;
	modals: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${poppins.variable} ${playfairDisplay.variable} antialiased`}>
				<ProviderWrapper>
					<ToastContainer />
					{modals}
					{children}
				</ProviderWrapper>
			</body>
		</html>
	);
}
