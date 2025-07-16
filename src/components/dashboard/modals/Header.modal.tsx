import { SquareX } from 'lucide-react';

import { Button } from '@/components/ui/Button';

interface Props {
	title?: string;

	closeModal?: () => void;
}
export default function Header({ closeModal, title }: Props) {
	return (
		<div className='mb-4 flex items-center justify-between'>
			<h1 className='font-medium text-2xl'>{title}</h1>
			<div className='mb-4 flex items-center justify-between'>
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
