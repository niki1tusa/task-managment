import type { Metadata } from 'next'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, OG_IMAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: `${SITE_NAME} | Home`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} | Home`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Task Hub Dashboard',
      },
    ],
    type: 'website',
  },
}

export default function Home() {
  return (
   <div>
hi
   </div>
  );
}
