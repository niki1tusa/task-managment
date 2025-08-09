import { Paperclip } from 'lucide-react';
import { memo, useState } from 'react';

import { AnimateIcon } from '../animate-ui/icons/icon';
import { SendIcon } from '../animate-ui/icons/send';

const ChatInput = ({ handleSend }: { handleSend: (text: string) => Promise<void> }) => {
	const [text, setText] = useState('');
	return (
		<div className='bg-primary/40 flex w-full flex-shrink-0 items-center justify-between px-4 py-3 text-[1rem] 2xl:px-8 2xl:text-xl'>
			<div className='flex flex-1 items-center gap-2'>
				<button type='button'>
					<Paperclip />
				</button>
				<input
					type='text'
					placeholder='Enter your message...'
					value={text}
					onChange={e => setText(e.target.value)}
					className='w-full bg-transparent outline-none'
					onKeyDown={e => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							handleSend(text).then(()=> setText(''));
						}
					}}
				/>
			</div>
			<AnimateIcon animateOnHover>
				<button
					onClick={() => handleSend(text).then(()=> setText(''))}
					className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-400/20 transition-colors hover:opacity-50'
				>
					<SendIcon size={22} className='text-white' />
				</button>
			</AnimateIcon>
		</div>
	);
};
export default memo(ChatInput);
