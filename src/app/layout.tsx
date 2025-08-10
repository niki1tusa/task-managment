import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';

import { SITE_NAME } from '@/constants/seo.constants';

import { ProviderWrapper } from '../providers/Providers';

import './globals.css';

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
		template: `${SITE_NAME} | %s`,
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
				{/* Skip to main content link for keyboard navigation */}
				<a
					href='#main-content'
					className='focus:bg-primary focus:ring-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:ring-offset-2 focus:outline-none'
				>
					Skip to main content
				</a>

				<ProviderWrapper>
					{modals}
					<main id='main-content' role='main'>
						{children}
					</main>
				</ProviderWrapper>
			</body>
		</html>
	);
}
