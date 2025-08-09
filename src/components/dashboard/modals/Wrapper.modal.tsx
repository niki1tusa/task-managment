import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble';

interface Props {
	closeModal?: () => void;
	children?: React.ReactNode;
	isLogin?: boolean;
}
export function WrapperModal({ closeModal, children, isLogin = false }: Props) {
	return (
		<>
			{isLogin ? (
				<BubbleBackground />
			) : (
				<div onClick={closeModal} className='bg-opacity-50 bg-background/90 fixed inset-0 z-40' />
			)}

			{children}
		</>
	);
}
