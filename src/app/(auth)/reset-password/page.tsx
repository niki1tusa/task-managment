import type { Metadata } from 'next';

import { ResetPassowrdClient } from '@/components/auth/reset-password/ResetPasswordClient';

export const metadata: Metadata = {
	title: 'reset-password',
};

export default function ResetPasswordPage() {
	return <ResetPassowrdClient />;
}
