import { seedUsers } from '@/shared/lib/seeder';
import { Button } from '@/shared/ui/buttons/Button';

export function Seed() {
	return (
		<div>
			<Button onClick={seedUsers}>Наполнить Юзеров</Button>
		</div>
	);
}
