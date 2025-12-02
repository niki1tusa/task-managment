'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/animate-ui/base/popover';
import { Avatar } from '@/components/ui/Avatar';
import ChatInput from '@/components/ui/chat/ChatInput';
import ChatMessage from '@/components/ui/chat/message/ChatMessage';
import { useChat } from '@/components/ui/chat/useChat';

import { GENERAL_CHAT_ID, GROUP_GAP_MINUTES } from '@/constants/global-constants';

import { GUARD_PAGES } from '@/config/guard-page-config';

import { useChannelStore } from '@/store/channel-store';

import { useChat } from '@/hooks/useChat';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useProfile } from '@/hooks/useProfile';

import { minsDiff } from '@/utils/minsDifferent';

import { Button } from '../button/Button';
import Textarea from '../field/Textarea';
import SearchMessageMenuPopover from '../popover/SearchMessageMenuPopover';

export default function Chat() {
	// store
	const { activeChannel } = useChannelStore();
	// hooks
	const { profile } = useProfile();
	const [isOpenInput, setIsOpenInput] = useState<boolean>(false);
	const [value, setValue] = useState('');
	const pathname = usePathname();
	const isDashboard = pathname === '/dashboard';
	// costom hooks
	const { ref } = useClickOutside<HTMLDivElement>(() => setIsOpenInput(false));
	const chat = useChat(activeChannel ? activeChannel.id : GENERAL_CHAT_ID);
	// memo
	const visibleMessages = useMemo(() => {
		const all = chat?.messages ?? [];
		return isDashboard ? all.slice(-7) : all; // последние 7 message
	}, [value, chat]);
	// search messages
	const filterMessages = useMemo(() => {
		if (!value) {
			return [];
		}
		let filterMsg = chat.messages.filter(item =>
			item.text.trim().toLowerCase().includes(value.trim().toLowerCase())
		);

		return filterMsg;
	}, [value]);
	// render messages
	const renderMessages = useMemo(() => {
		if (!chat) return null;
		const arr = visibleMessages;
		return arr.map((m, i) => {
			const prev = arr[i - 1];
			const next = arr[i + 1];
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
			const isFindMessage = filterMessages.some(item => item.id === m.id);
			return (
				<ChatMessage
					ref={el => {
						chat.messagesRefs.current[m.id] = el;
					}}
					isFindMessage={isFindMessage}
					value={value}
					key={m.id}
					message={m}
					isFirstInGroup={isFirstInGroup}
					isLastInGroup={isLastInGroup}
				/>
			);
		});
	}, [chat?.messages, visibleMessages, value, filterMessages]);

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
			<div className='bg-primary/40 dark:bg-side border-gray/20 flex h-27.5 w-full flex-shrink-0 items-center justify-between border-b-2 px-10 font-semibold shadow-sm'>
				<div className='flex items-center gap-3'>
					<div className='relative'>
						<Avatar img={profile?.avatar_path || ''} />
						<div className='absolute top-5.5 right-0 h-2 w-2 animate-pulse rounded-full border border-green-900 bg-green-500' />
					</div>
					<div className='flex flex-col'>
						<div
							className='text-sidebar-primary/80 text-[1rem] 2xl:text-[1.2rem] dark:text-white'
							id='chat-user-name'
						>
							{profile?.name}
						</div>
						<div
							className='text-sidebar-primary/80 text-[0.8rem] 2xl:text-[1rem] dark:text-white'
							aria-label='User occupation'
						>
							{profile?.occupation}
						</div>
						{/* <div>Channel | {activeChannel.name}</div> */}
					</div>
				</div>

				{/* поиск сообщений */}
				{pathname === GUARD_PAGES.MESSAGES &&
					(isOpenInput ? (
						<div ref={ref} className='relative'>
							{/* search field */}
							<Textarea value={value} setValue={setValue} placeholder='Search by word...' />
							{/* popover */}
							{/* TODO: как только появляется popover у textarea теряется фокус */}
							<Popover open={filterMessages.length > 0 && isOpenInput}>
								<PopoverContent
									side='left'
									align={'start'}
									sideOffset={8}
									className='bg-background shadow-default w-[240px] rounded-sm border p-3 dark:bg-white dark:text-black'
								>
									<SearchMessageMenuPopover
										count={filterMessages.length}
										onClose={() => setIsOpenInput(false)}
									/>
								</PopoverContent>
							</Popover>
						</div>
					) : (
						<button onClick={() => setIsOpenInput(true)}>
							<Search />
						</button>
					))}
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
						href={GUARD_PAGES.MESSAGES}
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
