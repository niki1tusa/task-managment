import { Suspense } from 'react';

import CallbackClient from './CallbaclClient';

export default function CallbackPage() {
	return (
		<Suspense>
			<CallbackClient />
		</Suspense>
	);
}
