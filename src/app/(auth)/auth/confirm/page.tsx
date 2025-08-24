import { Suspense } from 'react';

import { ConfirmClient } from './ConfirmClient';

export default async function PrivatePage() {
	return (
		<Suspense>
			<ConfirmClient />
		</Suspense>
	);
}
