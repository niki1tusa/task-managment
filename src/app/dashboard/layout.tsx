import Chat from '@/components/chat/Chat';
import { Sidebar } from '@/components/sidebar/Sidebar';

interface Props {
	children: React.ReactNode;
	modals: React.ReactNode;
}
export default function DashboardLayout({ children, modals }: Props) {
	return (
		<div className='grid grid-cols-[15%_60%_25%] justify-between'>
			<Sidebar />

			<main className='flex-1 dark:border-r dark:border-l dark:border-neutral-800'>
				{modals} {children}
			</main>

			<Chat />
		</div>
	);
}
