import type { Metadata } from 'next';

import { ResetPassowrdClient } from '@/components/auth/reset-password/ResetPasswordClient';

import AuthWrapper from '../AuthWrapper';

export const metadata: Metadata = {
	title: 'reset-password',
};
// TODO: после перехода с почты, вкидвает на homePage
export default function ResetPasswordPage() {
	return (
		<AuthWrapper>
			<ResetPassowrdClient />
		</AuthWrapper>
	);
}
