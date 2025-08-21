import { Button } from '@/components/ui/button/Button';

import { seedUsers } from '@/seeder';

export function Seed() {
	return (
		<div>
			<Button onClick={seedUsers}>Наполнить Юзеров</Button>
		</div>
	);
}
