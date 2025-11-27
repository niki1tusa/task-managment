import { Button } from '@/components/ui/button/Button';

import { seedUsers } from '@/utils/seeder';

export function Seed() {
	return (
		<div>
			<Button onClick={seedUsers}>Наполнить Юзеров</Button>
		</div>
	);
}
