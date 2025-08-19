import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';

interface Props {
	setSortType: (arg: 'all' | 'group' | 'task' | 'direct') => void;
}
export default function ChannelTabs({ setSortType }: Props) {
	return (
		<Tabs defaultValue='All' className='dark:bg-muted bg-gray w-full shadow-sm'>
			<TabsList className='grid w-full grid-cols-4 rounded-none border-b-2'>
				<TabsTrigger onClick={() => setSortType('all')} value='All'>
					All
				</TabsTrigger>
				<TabsTrigger onClick={() => setSortType('group')} value='Group'>
					Group
				</TabsTrigger>
				<TabsTrigger onClick={() => setSortType('task')} value='Task'>
					Task
				</TabsTrigger>
				<TabsTrigger onClick={() => setSortType('direct')} value='Direct'>
					Direct
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
