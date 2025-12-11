'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BtnReturnBack({ text }: { text?: string }) {
	const router = useRouter();
	return (
		<button
			onClick={() => router.back()}
			className='mt-5 flex items-center text-lg transition-colors hover:text-primary'
		>
			<ChevronLeft /> <span>{text}</span>
		</button>
	);
}
