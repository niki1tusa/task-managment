import { RegisterClient } from '@/components/auth/register/RegisterClient';

import AuthWrapper from '../AuthWrapper';

export default function RegisterPage() {
	return (
		<AuthWrapper>
			<RegisterClient />
		</AuthWrapper>
	);
}
