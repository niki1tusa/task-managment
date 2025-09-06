import type { Metadata } from 'next';

import { DropPasswordClient } from '@/components/auth/drop-passoword/DropPasswordClient';

import AuthWrapper from '../AuthWrapper';

export const metadata: Metadata = {
	title: 'Drop-password',
};

export default function NewPasswordPage() {
	return (
		<AuthWrapper>
			<DropPasswordClient />
		</AuthWrapper>
	);
}
