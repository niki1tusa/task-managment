'use client';

import { Paperclip } from 'lucide-react';
import { memo, useState } from 'react';

import { AnimateIcon } from '../animate-ui/icons/icon';
import { SendIcon } from '../animate-ui/icons/send';

const ChatInput = ({ handleSend }: { handleSend: (text: string) => Promise<void> }) => {
	const [text, setText] = useState('');

	// if string is empty, then return
	const sendMessage = () => {
		if (!text.trim()) return;
		handleSend(text.trim()).then(() => setText(''));
	};
	return (
		<div className='flex items-center gap-3 border-t bg-white px-4 py-3 shadow-lg dark:bg-gray-800'>
			<button
				type='button'
				className='flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700'
			>
				<Paperclip size={20} />
			</button>
			<textarea
				rows={1}
				placeholder='Enter your message...'
				value={text}
				onChange={e => setText(e.target.value)}
				className='flex-1 resize-none rounded-lg bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 outline-none shadow shadow-neutral-400 dark:bg-gray-700 dark:placeholder-gray-500'
				onKeyDown={e => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						handleSend(text).then(() => setText(''));
					}
				}}
			/>

			<AnimateIcon animateOnHover>
				<button
					disabled={!text.trim()}
					onClick={sendMessage}
					className={`flex h-10 w-10 items-center shadow shadow-neutral-400 justify-center rounded-full transition-colors ${
						text.trim()
							? 'bg-indigo-500 hover:bg-indigo-600'
							: 'cursor-not-allowed bg-gray-300 dark:bg-gray-600'
					}`}
				>
					<SendIcon size={22} className='text-white' />
				</button>
			</AnimateIcon>
		</div>
	);
};
export default memo(ChatInput);
