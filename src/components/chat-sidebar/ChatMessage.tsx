import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { CornerUpRight, Pencil, Trash } from 'lucide-react';
import { memo } from 'react';

import type { TChatMessageRow } from '@/shared/types/task/task.types';

import { useProfile } from '@/hooks/useProfile';

import { CopyButton } from '../animate-ui/buttons/copy';
import { Avatar } from '../ui/Avatar';
import Skeleton from '../ui/Skeleton';

interface Props {
	message: TChatMessageRow;
}

function ChatMessage({ message }: Props) {
	const { user, isLoading } = useProfile();

	if (isLoading || !user) {
		return <Skeleton />;
	}

	const isOwnMessage = user.id === message.user_id;
	const profileName = message.profile?.name || 'Unknown User';
	const avatarPath = message.profile?.avatar_path || '';

	return (
		<div className={clsx('flex items-end border', isOwnMessage ? 'justify-end' : 'justify-start')}>
			<div className='group relative flex w-auto items-end gap-2 border'>
				{!isOwnMessage && <Avatar img={avatarPath} />}
				{!isOwnMessage && <MenuMessage side='left' />}
				<div className='max-w-[70%]'>
					<div className='mb-0.5 flex text-[0.8rem] 2xl:text-[0.9rem]'>
						<span className='mr-1 opacity-80'>{isOwnMessage ? 'Me' : profileName}</span>
						<span className='opacity-50'>
							{format(parseISO(message.created_at!), 'hh:mm a').toLowerCase()}
						</span>
					</div>
					<div
						className={clsx(
							'rounded-lg px-3 py-2 text-[1rem] 2xl:text-xl',
							isOwnMessage
								? 'rounded-br-none bg-indigo-500 text-white'
								: 'rounded-bl-none bg-indigo-300 text-black'
						)}
					>
						{message.text}
					</div>
				</div>
				{isOwnMessage && avatarPath && <Avatar img={avatarPath} />}
				{isOwnMessage && <MenuMessage side='right' />}
			</div>
		</div>
	);
}
export default memo(ChatMessage);

function MenuMessage({ side }: { side: 'left' | 'right' }) {
	return (
		<div
			className={clsx(
				side === 'left' ? 'bottom-14.5 left-10' : 'right-10 bottom-14',
				'border-primary absolute flex items-center gap-1 rounded-sm border bg-white p-1 opacity-0 transition-opacity group-hover:opacity-100'
			)}
		>
			<button title='Edit message'>
				<Pencil size={20} />
			</button>
			<CopyButton title='Copy message' variant={'outline'} size={'sm'} />
			<button title='Resend message'>
				<CornerUpRight size={20} />
			</button>
			<button title='Delete message'>
				<Trash size={20} />
			</button>
		</div>
	);
}
