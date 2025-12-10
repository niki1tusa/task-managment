import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo-constants';

import { Seed } from './Seed';

export const metadata: Metadata = {
	title: 'ADmIn',

	...NO_INDEX_PAGE,
};

export default function Page() {
	return (
		<div>
			<Seed />
		</div>
	);
}
