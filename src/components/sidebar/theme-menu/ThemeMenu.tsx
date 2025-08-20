import { Title } from '@/components/ui/Title';

import { ThemeItem } from './ThemeItem';

const THEMES = [{ type: 'Light' }, { type: 'Dark' }, { type: 'System' }];

export default function ThemeMenu() {
	return (
		<nav className='flex w-full flex-col gap-4'>
			<span className='border-gray/30 mt-4 block w-[80%] border-b-2' />
			<Title isMenuTitle={true}>Theme</Title>
			{THEMES.map((item, i) => (
				<ThemeItem key={`${item.type}-${i}`} type={item.type} />
			))}
		</nav>
	);
}
