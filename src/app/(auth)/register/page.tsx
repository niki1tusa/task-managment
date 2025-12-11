import AuthWrapper from '../AuthWrapper';

import { RegisterClient } from '@/widgets/auth/register/RegisterClient';

export default function RegisterPage() {
	return (
		<AuthWrapper>
			<RegisterClient />
		</AuthWrapper>
	);
}
