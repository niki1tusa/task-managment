import { Button } from '@/components/ui/Button';
import { seedUsers } from '@/seeder';


export function Seed() {
	return (
		<div>
			<Button onClick={seedUsers}>Наполнить Юзеров</Button>
		</div>
	);
}
