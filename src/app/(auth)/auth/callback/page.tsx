import { Suspense } from 'react';

import AuthWrapper from '../../AuthWrapper';

import CallbackClient from './CallbaclClient';

export default function CallbackPage() {
	return (
		<Suspense>
			<AuthWrapper>
				<CallbackClient />
			</AuthWrapper>
		</Suspense>
	);
}
