import type { Metadata } from 'next';

import AuthWrapper from '../AuthWrapper';

import { DropPasswordClient } from '@/widgets/auth/drop-passoword/DropPasswordClient';

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
