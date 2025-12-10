'use client';

import { ChevronDown, ChevronUp, CornerUpRight, SearchCheck, SquareX } from 'lucide-react';

interface Props {
	onClose: () => void;
	count: number;
	messagesRefs: Record<string, HTMLDivElement | null>;
}
export default function SearchMessageMenuPopover({ count, onClose, messagesRefs }: Props) {
	return (
		<div className='flex flex-col gap-2 rounded-sm p-3 text-base'>
			{/* header */}
			<div className='flex items-center justify-between'>
				<div>Found words:</div>
				<SquareX size={18} className='hover:text-red-600' onClick={() => onClose()} />
			</div>
			<div className='w-full border-b' />
			{/* main */}
			<div className='flex items-center gap-3 rounded bg-gray-100 p-1 transition-colors hover:bg-gray-200'>
				<SearchCheck size={18} /> <div>Match: {count}</div>
			</div>

			<div className='w-full border-b' />
			<div className='flex items-center gap-2 p-1'>
				tit
				<div className='flex flex-col'>
					<button
						type='button'
						className='flex items-center gap-3 rounded bg-gray-100 p-1 transition-colors hover:bg-gray-200'
					>
						<ChevronUp size={18} />
					</button>
					<button
						type='button'
						className='flex items-center gap-3 rounded bg-gray-100 p-1 transition-colors hover:bg-gray-200'
					>
						<ChevronDown size={18} />
					</button>
				</div>
			</div>
		</div>
	);
}
