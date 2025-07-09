import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { SITE_NAME } from '@/constants/seo.constants';

import { ProviderWrapper } from '../providers/Providers';

import './globals.css';

const poppins = Poppins({
	variable: '--font-poppins-sans',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
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
	description: 'This is gentle app for your managment.',
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
			<body className={`${poppins.variable} antialiased `}>
				<ProviderWrapper>{modals}{children}</ProviderWrapper>
			</body>
		</html>
	);
}
