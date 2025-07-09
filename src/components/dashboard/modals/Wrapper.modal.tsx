import { ToastContainer } from 'react-toastify';

interface Props {
	closeModal?: () => void;
    children?: React.ReactNode
}
export function WrapperModal({ closeModal, children }: Props) {
	return (
		<>
			<div onClick={closeModal} className='bg-opacity-50 bg-background/90 fixed inset-0 z-40' />
			<ToastContainer />
            {children}
		</>
	);
}
