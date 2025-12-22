'use client';

import clsx from 'clsx';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

import { GUARD_PAGES } from '@/shared/config/guard-page-config';
import { GENERAL_CHAT_ID, GROUP_GAP_MINUTES } from '@/shared/constants/constants';
import { useClickOutside } from '@/shared/lib/use-onclick-outside';
import { useChannelStore } from '@/shared/store/channel-store';
import { Avatar } from '@/shared/ui/Avatar';
import { PopoverAnchor } from '@/shared/ui/animate-ui/primitives/radix/popover';
import { Popover, PopoverContent } from '@/shared/ui/animate-ui/radix/popover';
import { Button } from '@/shared/ui/buttons/Button';
import Textarea from '@/shared/ui/fields/Textarea';
import SearchMessageMenuPopover from '@/shared/ui/popover/SearchMessageMenuPopover';

import ChatMessage from './ChatMessage';
import { useProfile } from '@/entities/profile/use-profile';
import { minsDiff } from '@/widgets/chat/model/minsDifferent';
import { useChat } from '@/widgets/chat/model/use-chat';
import ChatInput from '@/widgets/chat/ui/ChatInput';

// TODO: сообщения не отправляються и появляються новые только после перезагрузки старницы (или это плохой интернет)
export default function Chat() {
	// store
	const { activeChannel } = useChannelStore();
	// hooks
	const { profile } = useProfile();
	const [isOpenInput, setIsOpenInput] = useState<boolean>(false);
	const [value, setValue] = useState('');
	const popoverRef = useRef(null);
	const pathname = usePathname();
	const isDashboard = pathname === '/dashboard';
	const ignoreRefs = useMemo(() => [popoverRef], []);
	// costom hooks
	const { ref } = useClickOutside<HTMLDivElement>(() => setIsOpenInput(false), ignoreRefs);
	const chat = useChat(activeChannel ? activeChannel.id : GENERAL_CHAT_ID);
	// memo
	// const visibleMessages = useMemo(() => {
	// 	const all = chat?.messages ?? [];
	// 	return isDashboard ? all : all;
	// }, [value, chat]);
	// search messages
	const filterMessages = useMemo(() => {
		if (!value) {
			return [];
		}
		let filterMsg = chat.messages.filter(item =>
			item.text.trim().toLowerCase().includes(value.trim().toLowerCase())
		);

		return filterMsg;
	}, [value, chat.messages]);
	// render messages
	const renderMessages = useMemo(() => {
		if (!chat) return null;
		const arr = chat.messages;
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
	}, [chat?.messages, value, filterMessages]);

	return (
		<div className='flex h-full flex-col' aria-label='Chat panel'>
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
			{/* chat overlay */}
			{!isDashboard && (
				<div className='from-primary/20 dark:from-gray/5 pointer-events-none absolute top-27.5 left-0 z-50 h-[40%] w-full bg-linear-to-b to-transparent' />
			)}
			{/* User info */}
			<div className='bg-primary/40 dark:bg-side border-gray/20 flex h-27.5 w-full shrink-0 items-center justify-between border-b-2 px-10 font-semibold shadow-sm'>
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
						<Popover open={filterMessages.length > 0 && isOpenInput}>
							<PopoverAnchor asChild>
								<div ref={ref} className='relative'>
									{/* search field */}
									<Textarea value={value} setValue={setValue} placeholder='Search by word...' />
								</div>
							</PopoverAnchor>
							<PopoverContent
								ref={popoverRef}
								side='left'
								align={'start'}
								sideOffset={8}
								onOpenAutoFocus={e => e.preventDefault()}
								onCloseAutoFocus={e => e.preventDefault()}
								onFocusOutside={e => e.preventDefault()}
								className='bg-background shadow-default w-60 rounded-sm border p-3 dark:bg-white dark:text-black'
							>
								<SearchMessageMenuPopover
									count={filterMessages.length}
									onClose={() => setIsOpenInput(false)}
									messagesRefs={chat.messagesRefs}
								/>
							</PopoverContent>
						</Popover>
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
					<div className='from-primary pointer-events-none absolute top-0 left-0 z-40 h-full w-full bg-linear-to-b to-transparent dark:from-[#6366F1]' />
				)}

				<div className={clsx('flex flex-col', isDashboard && 'h-[365px] overflow-y-hidden')}>
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
