import type { Metadata } from 'next';

import AuthWrapper from '../AuthWrapper';

import { ResetPassowrdClient } from '@/pages/auth/reset-password/ResetPasswordClient';

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
