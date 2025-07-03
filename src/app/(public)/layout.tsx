import Chat from '@/components/chat/Chat';
import { Sidebar } from '@/components/sidebar/Sidebar';

interface Props {
	children: React.ReactNode;
	modals: React.ReactNode;
}
export default function Layout({ children, modals }: Props) {
	console.log('modals:', modals)
	return (
		<div className='grid grid-cols-[15%_60%_25%] justify-between '>
			<Sidebar />
			<main className='flex-1 dark:border-r dark:border-l dark:border-neutral-800'>
		{modals && <div className='z-50 bg-amber-600 w-[300px] h-[500px] border border-amber-950' >{modals}</div>} {children}
			</main>
			<Chat/>
		</div>
	);
}
