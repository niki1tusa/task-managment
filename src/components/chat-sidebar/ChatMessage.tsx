import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { memo, useState } from 'react';

import type { TChatMessageRow } from '@/shared/types/task/task.types';

import { useProfile } from '@/hooks/useProfile';

import { Avatar } from '../ui/Avatar';
import Skeleton from '../ui/Skeleton';

import { MenuMessage } from './MenuMessage';

interface Props {
	message: TChatMessageRow;
	isFirstInGroup: boolean;
	isLastInGroup: boolean;
}

function ChatMessage({ message, isFirstInGroup, isLastInGroup }: Props) {
	const { user, isLoading } = useProfile();
	const [isShowMenuMessage, setIsShowMenuMessage] = useState(false);
	if (isLoading || !user) {
		return <Skeleton />;
	}

	const isOwnMessage = user.id === message.user_id;
	const profileName = message.profile?.name;
	const avatarPath = message.profile?.avatar_path;

	// показываем аватар только у "последнего" сообщения группы
	const isShowAvatar = isLastInGroup && !!avatarPath;
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
							<span className='opacity-50'>
								{format(parseISO(message.created_at!), 'hh:mm a').toLowerCase()}
							</span>
						</div>
					)}
					{/* message */}
					<div
						onMouseDown={e => {
							e.preventDefault();
							setIsShowMenuMessage(true);
						}}
						className={clsx(
							'relative w-fit rounded-2xl px-3 py-2 text-[1rem] 2xl:max-w-[600px] 2xl:text-xl',
							// устойчивость к любым строкам + переносы
							'[overflow-wrap:anywhere] break-words hyphens-auto whitespace-pre-wrap',
							isOwnMessage
								? clsx(
										'bg-indigo-600 text-white',
										isLastInGroup ? 'rounded-tr-sm rounded-br-none' : 'rounded-tr-sm rounded-br-sm'
									)
								: clsx(
										'rounded-tl-sm rounded-bl-sm bg-indigo-300 text-white',
										isLastInGroup ? 'rounded-tl-sm rounded-bl-none' : 'rounded-tl-sm rounded-bl-sm'
									)
						)}
					>
						{message.text}
						{isShowMenuMessage && <MenuMessage side={isOwnMessage ? 'right' : 'left'} />}
					</div>
				</div>
			</div>
		</div>
	);
}
export default memo(ChatMessage);
