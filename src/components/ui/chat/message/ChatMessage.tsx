'use client';

import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/animate-ui/base/popover';

import { useProfile } from '@/hooks/useProfile';

import { Avatar } from '../../Avatar';
import Skeleton from '../../Skeleton';
import MessageMenuPopover from '../../popover/MessageMenuPopover';

import type { TChatMessageRow } from './message.types';

interface Props {
	message: TChatMessageRow;
	isFirstInGroup: boolean;
	isLastInGroup: boolean;
}

function ChatMessage({ message, isFirstInGroup, isLastInGroup }: Props) {
	const { profile, isLoading } = useProfile();
	const [openId, setOpenId] = useState<string | null>(null);
	// клик по пузырю: не открывать, если есть выделенный текст
	const handleClick = useCallback(() => {

			const sel = typeof window !== 'undefined' ? window.getSelection()?.toString() : '';
			if (sel && sel.length > 0) return; // позволяем копировать текст
			setOpenId(message.id);
		
	}, [message.id]);
	const messageTime = useMemo(
		() => format(parseISO(message.created_at!), 'hh:mm a').toLowerCase(),
		[message.id]
	);
	//
	useEffect(() => {
		setOpenId(null);
	}, [message.id]);


	if (isLoading || !profile) {
		return <Skeleton />;
	}

	const isOwnMessage = profile.id === message.user_id;
	const profileName = message.profile?.name;
	const avatarPath = message.profile?.avatar_path;
	// показываем аватар только у "последнего" сообщения группы
	const isShowAvatar = isLastInGroup;
	return (
		<div className={clsx('flex items-end', isOwnMessage ? 'justify-end' : 'justify-start')}>
			<div
				className={clsx(
					'group relative flex w-auto items-end gap-2',
					isOwnMessage && 'flex-row-reverse',
					isFirstInGroup ? 'mt-3' : 'mt-0.5 gap-0'
				)}
			>
				{isShowAvatar ? <Avatar img={avatarPath} /> : <div className='w-8' />}
				<div className={clsx('flex min-w-0 flex-col', isOwnMessage ? 'items-end' : 'items-start')}>
					{/* time + name owner */}
					{isFirstInGroup && (
						<div className='mb-0.5 flex gap-1 text-[0.8rem] 2xl:text-[0.9rem]'>
							<span className='mr-1 opacity-80'>{isOwnMessage ? 'Me' : profileName}</span>
							<span className='opacity-50'>{messageTime}</span>
						</div>
					)}
					{/* message */}
					{isOwnMessage ? (
						<Popover
							open={openId === message.id}
							onOpenChange={(v: boolean) => setOpenId(v ? message.id : null)}
						>
							<PopoverTrigger
								render={
									<button
										role='button'
										tabIndex={0}
										onClick={() => {
											handleClick();
										}}
										onContextMenu={e => {
											e.preventDefault();
											handleClick();
										}}
										className={clsx(
											'relative w-fit rounded-2xl px-3 py-2 text-[1rem] 2xl:max-w-[600px] 2xl:text-xl',
											'[overflow-wrap:anywhere] break-words hyphens-auto whitespace-pre-wrap',
											isOwnMessage
												? clsx(
														'bg-indigo-600 text-white',
														isLastInGroup
															? 'rounded-tr-sm rounded-br-none'
															: 'rounded-tr-sm rounded-br-sm'
													)
												: clsx(
														'bg-indigo-300 text-white',
														isLastInGroup
															? 'rounded-tl-sm rounded-bl-none'
															: 'rounded-tl-sm rounded-bl-sm'
													),
											// лёгкий ховер, чтобы было понятно, что можно кликнуть
											'hover:brightness-[1.02]'
										)}
									>
										{message.text}
									</button>
								}
							/>

							<PopoverContent
								side='bottom'
								align={'end'}
								sideOffset={8}
								className='bg-background w-[240px] rounded-sm border p-3 shadow shadow-neutral-400'
							>
								<MessageMenuPopover msg={message} onClose={() => setOpenId(null)} />
							</PopoverContent>
						</Popover>
					) : (
						<button
							role='button'
							className={clsx(
								'relative w-fit rounded-2xl px-3 py-2 text-[1rem] 2xl:max-w-[600px] 2xl:text-xl',
								'[overflow-wrap:anywhere] break-words hyphens-auto whitespace-pre-wrap',
								isOwnMessage
									? clsx(
											'bg-indigo-600 text-white',
											isLastInGroup
												? 'rounded-tr-sm rounded-br-none'
												: 'rounded-tr-sm rounded-br-sm'
										)
									: clsx(
											'bg-indigo-300 text-white',
											isLastInGroup
												? 'rounded-tl-sm rounded-bl-none'
												: 'rounded-tl-sm rounded-bl-sm'
										),
								// лёгкий ховер, чтобы было понятно, что можно кликнуть
								'hover:brightness-[1.02]'
							)}
						>
							{message.text}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
export default memo(ChatMessage);
