import clsx from 'clsx';
import { Copy, SquarePen, SquarePlus, SquareX, Trash } from 'lucide-react';

import { useModalStore } from '@/store/modals.store';

import { useClickOutside } from '@/hooks/useClickOutside';

import type { TChannelRow } from './channel.types';

interface Props {
	activeChannel: TChannelRow;
	setIsShowChannelMenu: (arg: boolean) => void;
}
export default function ChannelMenuPopover({ activeChannel, setIsShowChannelMenu }: Props) {
	const { open } = useModalStore();
	const { ref } = useClickOutside<HTMLDivElement>(() => setIsShowChannelMenu(false));
	return (
		<div
			ref={ref}
			className='bg-background absolute z-20 flex w-[200px] flex-col gap-2 rounded-sm border p-3 text-base shadow shadow-neutral-400'
		>
			{/* header */}
			<div className='flex items-center justify-between'>
				<div>Channel Menu</div>
				<SquareX size={18} className='hover:text-red-600' onClick={() => setIsShowChannelMenu(false)} />
			</div>
			<div className='w-full border-b' />
			{/* main */}
			<button
				type='button'
                onClick={()=> open('renameChannel', activeChannel)}
				className={clsx(
					(activeChannel?.type === 'task' || activeChannel?.name === 'General') &&
						'cursor-not-allowed text-black/20',
					'flex items-center gap-3'
				)}
				disabled={activeChannel?.type === 'task' || activeChannel?.name === 'General'}
			>
				<SquarePen size={18} /> <div>Rename channel</div>
			</button>
			<button type='button' className='flex items-center gap-3'>
				<Copy size={18} /> <div>Copy name</div>
			</button>
			<div className='w-full border-b' />
			<button
				type='button'
                onClick={()=> open('insertProfileInChannel', activeChannel)}
				className={clsx(
					activeChannel?.type !== 'group' && 'cursor-not-allowed text-black/20',
					'flex items-center gap-3'
				)}
				disabled={activeChannel?.type !== 'group'}
			>
				<SquarePlus size={18} /> <div>Add profile </div>
			</button>
			<div className='w-full border-b' />
			<button
				type='button'
				className={clsx(
					activeChannel?.name === 'General' && 'cursor-not-allowed text-black/20',
					'flex items-center gap-3'
				)}
				onClick={() => open('deleteChannel', activeChannel)}
				disabled={activeChannel?.name === 'General'}
			>
				<Trash size={18} /> Delete channel
			</button>
		</div>
	);
}
