import clsx from 'clsx';
import { CornerUpRight, Pencil, Trash } from 'lucide-react';

import { CopyButton } from '../animate-ui/buttons/copy';

export function MenuMessage({ side }: { side: 'left' | 'right' }) {
	return (
		<div
			className={clsx(
				side === 'left' ? 'bottom-[150%] left-0' : 'right-0 bottom-[105%]',
				'border-primary absolute flex items-center gap-1 rounded-sm border bg-white p-1 text-black opacity-0 transition-opacity group-hover:opacity-100'
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
