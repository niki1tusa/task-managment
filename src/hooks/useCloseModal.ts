import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useCloseModal() {
	const router = useRouter();
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				router.back();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []);

	return;
}
