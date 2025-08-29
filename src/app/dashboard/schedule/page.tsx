import type { Metadata } from 'next';

import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/button/Button';

import CalendarApp from './Calendar';

import '@schedule-x/theme-default/dist/index.css';

export const metadata: Metadata = {
	title: 'Schedule',
};

export default function SchedulePage() {
	return (
		<div className='flex flex-col gap-3 px-5 pt-7'>
		
			<main className='min-w-0 flex-1 overflow-hidden'>
				<CalendarApp />
			</main>
			<Button className='w-[150px]'>+ Add event</Button>
		</div>
	);
}
