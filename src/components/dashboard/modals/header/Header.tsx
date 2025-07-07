import { SquareX } from 'lucide-react';

import { Button } from '@/components/ui/Button';

interface Props {
    title?: string
	children: React.ReactNode;
	closeModal?: () => void;
}
export default function Header({ children, closeModal, title }: Props) {
	return (
		<div className='mb-4 flex items-center justify-between'>
			<h1>{title}</h1>
			<div className='mb-4 flex items-center justify-between'>
				{children}
				<Button
					onClick={closeModal}
					className='text-2xl font-bold transition-colors hover:text-red-600'
				>
					<SquareX />
				</Button>
			</div>
		</div>
	);
}
