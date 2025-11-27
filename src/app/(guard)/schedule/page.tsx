import type { Metadata } from 'next';


import CalendarApp from '../../../components/pages/schedule/Calendar';


export const metadata: Metadata = {
	title: 'Schedule',
};

export default function SchedulePage() {
	return (
		<div className='flex flex-col gap-3 px-5 pt-7'>
			<main className='flex-1 overflow-hidden'>
				<CalendarApp />
			</main>
		</div>
	);
}
