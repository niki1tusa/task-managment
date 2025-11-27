import clsx from 'clsx';
import { SquarePen, SquarePlus, SquareX, Trash } from 'lucide-react';

import { BtnCopyName } from '@/components/ui/button/BtnCopyName';

import { useModalStore } from '@/store/modals-store';

import { useProfile } from '@/hooks/useProfile';

import type { TChannelRow } from '../../pages/messages/channel/channel.types';

interface Props {
	activeChannel: TChannelRow;
	onClose: () => void;
}
export default function ChannelMenuPopover({ activeChannel, onClose }: Props) {
	const { open } = useModalStore();
	const { profile } = useProfile();
	const isNotOwner = profile?.id !== activeChannel.created_by;
	return (
		<div className='flex flex-col gap-2 rounded-sm p-3 text-base dark:text-black'>
			{/* header */}
			<div className='flex items-center justify-between'>
				<div>Channel Menu</div>
				<SquareX size={18} className='hover:text-red-600' onClick={() => onClose()} />
			</div>
			<div className='w-full border-b' />
			{/* main */}
			<button
				type='button'
				onClick={() => {
					open('renameChannel', activeChannel);
					onClose();
				}}
				className={clsx(
					(activeChannel?.type === 'task' || activeChannel?.name === 'General') &&
						'cursor-not-allowed text-black/20',
					'flex items-center gap-3 rounded bg-gray-100 p-1 transition-colors hover:bg-gray-200'
				)}
				disabled={activeChannel?.type === 'task' || activeChannel?.name === 'General'}
			>
				<SquarePen size={18} /> <div>Rename channel</div>
			</button>
			<BtnCopyName text={activeChannel.name} />
			<div className='w-full border-b' />
			<button
				type='button'
				onClick={() => open('insertProfileInChannel', activeChannel)}
				className={clsx(
					activeChannel?.type !== 'group' && 'cursor-not-allowed text-black/20',
					'flex items-center gap-3 rounded bg-gray-100 p-1 transition-colors hover:bg-gray-200'
				)}
				disabled={activeChannel?.type !== 'group'}
			>
				<SquarePlus size={18} /> <div>Add profile </div>
			</button>
			<div className='w-full border-b' />
			<button
				type='button'
				className={clsx(
					(activeChannel?.name === 'General' || isNotOwner) && 'cursor-not-allowed text-black/20',
					'flex items-center gap-3 rounded bg-gray-100 p-1 transition-colors hover:bg-gray-200'
				)}
				onClick={() => open('deleteChannel', activeChannel)}
				disabled={activeChannel?.name === 'General' || isNotOwner}
			>
				<Trash size={18} /> Delete channel
			</button>
		</div>
	);
}
