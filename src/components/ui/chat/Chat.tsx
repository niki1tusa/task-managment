import clsx from 'clsx';
// import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Avatar } from '@/components/ui/Avatar';
import ChatInput from '@/components/ui/chat/ChatInput';
import ChatMessage from '@/components/ui/chat/message/ChatMessage';
import { useChat } from '@/components/ui/chat/useChat';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import { useChannelStore } from '@/store/channel.store';

import { Button } from '../button/Button';

import { GROUP_GAP_MINUTES, minsDiff } from './messageUtils';

interface Props {
	profile: TProfileRow;
}

export default function Chat({ profile }: Props) {
	const { activeChannel } = useChannelStore();
	const pathname = usePathname();
	const isDashboard = pathname === '/dashboard';
	const chat = useChat(activeChannel ? activeChannel.id : '69d922e1-63f4-4f1d-9627-97aa6319902a');
	const visibleMessages = useMemo(() => {
		const all = chat?.messages ?? [];
		return isDashboard ? all.slice(-7) : all; // последние 7
	}, [isDashboard, chat?.messages]);
	const renderMessages = useMemo(() => {
		if (!chat) return null;
		return visibleMessages.map((m, i) => {
			const prev = chat.messages[i - 1];
			const next = chat.messages[i + 1];
			const sameAsPrev =
				!!prev &&
				prev.user_id === m.user_id &&
				minsDiff(prev.created_at!, m.created_at!) <= GROUP_GAP_MINUTES;

			const sameAsNext =
				!!next &&
				next.user_id === m.user_id &&
				minsDiff(next.created_at!, m.created_at!) <= GROUP_GAP_MINUTES;
			const isFirstInGroup = !sameAsPrev;
			const isLastInGroup = !sameAsNext;
			return (
				<ChatMessage
					key={m.id}
					message={m}
					isFirstInGroup={isFirstInGroup}
					isLastInGroup={isLastInGroup}
				/>
			);
		});
	}, [chat?.messages]);
	return (
		<div className='flex h-full flex-col' role='complementary' aria-label='Chat panel'>
			{isDashboard && (
				<div className='relative w-full'>
					<Image
						alt='chat-img'
						src='/chat.png'
						width={500}
						height={300}
						className='h-auto 2xl:w-[570px]'
						sizes='(max-width: 320px) 100vw, 300px'
					/>
				</div>
			)}
			{/* overlay должен быть ниже user info! */}
			{!isDashboard && (
				<div className='from-primary/20 dark:from-gray/5 pointer-events-none absolute top-27.5 left-0 z-50 h-[40%] w-full bg-gradient-to-b to-transparent' />
			)}
			{/* User info */}
			<div className='bg-primary/40 border-gray/20 flex h-27.5 w-full flex-shrink-0 items-center justify-between border-b-2 px-10 font-semibold shadow-sm'>
				<div className='flex items-center gap-3'>
					<div className='relative'>
						<Avatar img={profile.avatar_path || ''} />
						<div className='absolute top-5.5 right-0 h-2 w-2 animate-pulse rounded-full border border-green-900 bg-green-500' />
					</div>
					<div className='flex flex-col'>
						<div
							className='text-sidebar-primary/80 text-[1rem] 2xl:text-[1.2rem]'
							id='chat-user-name'
						>
							{profile.name}
						</div>
						<div
							className='text-sidebar-primary/80 text-[0.8rem] 2xl:text-[1rem] dark:text-white'
							aria-label='User occupation'
						>
							{profile.occupation}
						</div>
						{/* <div>Channel | {activeChannel.name}</div> */}
					</div>
				</div>

				{/* TODO: сделать поиск сообщений */}
				{/* <button onClick={()=>}>
					<Search />
				</button> */}
			</div>

			{/* Messages */}
			<div
				className='relative h-full flex-1 overflow-y-auto px-2 py-2'
				role='log'
				aria-label='Chat messages'
				aria-live='polite'
			>
				{/* button from dahsboard to messages page */}
				{isDashboard && (
					<Link
						href={DASHBOARD_PAGES.MESSAGES}
						className='absolute top-[10%] left-[50%] z-50 -translate-x-[50%] transform'
					>
						<Button variant='transparent' className='w-[100px]'>
							Look more
						</Button>
					</Link>
				)}
				{/* Fade overlay for dashboard */}
				{isDashboard && (
					<div className='from-primary pointer-events-none absolute top-0 left-0 z-40 h-full w-full bg-gradient-to-b to-transparent dark:from-[#6366F1]' />
				)}

				<div className='flex flex-col'>
					{renderMessages}
					{/* last message */}
					{chat && !isDashboard && <div ref={chat.messagesEndRef} aria-hidden='true' />}
				</div>
			</div>

			{/* Input field */}
			{chat && <ChatInput handleSend={chat.handleSend} />}
		</div>
	);
}
