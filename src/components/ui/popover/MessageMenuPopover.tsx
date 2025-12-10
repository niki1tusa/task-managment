'use client';

import clsx from 'clsx';
import { CornerUpRight, SquarePen, SquareX, Trash } from 'lucide-react';

import type { TChatMessageRow } from '@/shared/types/message-types';

import { useModalStore } from '@/store/modals-store';

import { BtnCopyName } from '../../../shared/ui/button/BtnCopyName';

interface Props {
	msg: TChatMessageRow;
	onClose: () => void;
}
export default function MessageMenuPopover({ msg, onClose }: Props) {
	const { open } = useModalStore();

	return (
		<div className='flex flex-col gap-2 rounded-sm p-3 text-base'>
			{/* header */}
			<div className='flex items-center justify-between'>
				<div>Message menu</div>
				<SquareX size={18} className='hover:text-red-600' onClick={() => onClose()} />
			</div>
			<div className='w-full border-b' />
			{/* main */}
			<button
				type='button'
				onClick={e => {
					e.stopPropagation();
					open('updateMessage', msg);
					onClose();
				}}
				className={clsx(
					'flex items-center gap-3 rounded bg-gray-100 p-1 transition-colors hover:bg-gray-200'
				)}
			>
				<SquarePen size={18} /> <div>Edit Message</div>
			</button>
			<BtnCopyName text={msg.text} />
			<div className='w-full border-b' />
			<button
				type='button'
				className='flex items-center gap-3 rounded bg-gray-100 p-1 transition-colors hover:bg-gray-200'
			>
				<CornerUpRight size={18} /> <div className='flex flex-nowrap'>Resend message </div>
			</button>
			<div className='w-full border-b' />
			<button
				type='button'
				onClick={e => {
					e.stopPropagation();
					open('deleteMessage', msg.id);
					onClose();
				}}
				className={clsx(
					'flex items-center gap-3 rounded bg-gray-100 p-1 transition-colors hover:bg-gray-200'
				)}
			>
				<Trash size={18} /> Delete message
			</button>
		</div>
	);
}
