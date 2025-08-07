import clsx from 'clsx';
import { format, parseISO } from 'date-fns';

import type { TChatMessageRow } from '@/shared/types/task/task.types';

import { useProfile } from '@/hooks/useProfile';

import { Avatar } from '../ui/Avatar';
import Skeleton from '../ui/Skeleton';

export default function ChatMessage({ message }: { message: TChatMessageRow }) {
	const { user, isLoading } = useProfile();

	if (isLoading || !user) {
		return <Skeleton />;
	}

	const isOwnMessage = user.id === message.user_id;
	const profileName = message.profile?.name || 'Unknown User';
	const avatarPath = message.profile?.avatar_path || '';

	return (
		<div className={clsx('flex items-end gap-2', isOwnMessage ? 'justify-end' : 'justify-start')}>
			{!isOwnMessage && <Avatar img={avatarPath} />}
			<div className='max-w-[70%]'>
				<div className='mb-0.5 text-[0.8rem] 2xl:text-[0.9rem]'>
					<span className='mr-1 opacity-80'>{isOwnMessage ? 'Me' : profileName}</span>
					<span className='opacity-50'>
						{format(parseISO(message.created_at!), 'hh:mm a').toLowerCase()}
					</span>
				</div>
				<div
					className={clsx(
						'px-3 py-2 text-[1rem] 2xl:text-xl',
						isOwnMessage
							? 'rounded-lg rounded-br-none bg-indigo-500'
							: 'rounded-lg rounded-bl-none bg-indigo-300'
					)}
				>
					{message.text}
				</div>
			</div>
			{isOwnMessage && avatarPath && (
				<Avatar img={avatarPath} />
			)}
		</div>
	);
}