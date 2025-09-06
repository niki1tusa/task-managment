import { Suspense } from 'react';

import AuthWrapper from '../../AuthWrapper';

import { ConfirmClient } from './ConfirmClient';

export default async function PrivatePage() {
	return (
		<Suspense>
			<AuthWrapper>
				<ConfirmClient />
			</AuthWrapper>
		</Suspense>
	);
}
