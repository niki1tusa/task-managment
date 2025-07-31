import Image from 'next/image';

export default function Chat() {
	return (
		<div className='bg-chat  hidden w-full  items-center justify-center text-8xl text-white lg:flex'>
			<Image alt='chat' src='/chat.jpg' width={500} height={500} />
			<span className='bg-chat-bg-message'> message</span>
		</div>
	);
}
