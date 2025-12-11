import AuthWrapper from '../AuthWrapper';

import { RegisterClient } from '@/pages/auth/register/RegisterClient';

export default function RegisterPage() {
	return (
		<AuthWrapper>
			<RegisterClient />
		</AuthWrapper>
	);
}
