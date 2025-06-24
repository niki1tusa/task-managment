import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { SITE_NAME } from "@/constants/seo.constants";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon/favicon.svg",
    shortcut: "/favicon/favicon.svg",
  },
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "This is gentle app for your managment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased `}>{children}</body>
    </html>
  );
}
